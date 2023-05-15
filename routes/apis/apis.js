const express = require("express");
const router = require("express").Router();
const catchAsync = require("../../utils/ErrorCatcher");
const axios = require("axios");
const geolib = require("geolib");
const publications = require("../../models/publications");

router.get(
  "/location",
  catchAsync(async (req, res) => {
    const { city, zipcode } = req.user;
    const location = `${city},Puerto Rico,${zipcode}`;

    const { data } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&access_token=${process.env.MAPBOX_KEY}&limit=1`
    );
    const userLocation = data.features[0].geometry.coordinates;

    const publication = await publications.find({}).populate("group");

    const pubLocations = [];

    for (let i = 0; i < publication.length; i++) {
      const { city, zipcode } = publication[i];
      const location = `${city},Puerto Rico,${zipcode}`;
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&access_token=${process.env.MAPBOX_KEY}&limit=1`
      );

      const result = {
        location: publication[i].location,
        image: publication[i].image,
        group: publication[i].group,
        date: publication[i].date,
        title: publication[i].title,
        city: publication[i].city,
        coord: data.features[0].geometry.coordinates,
        id: publication[i]._id,
      };
      pubLocations.push(result);
    }

    const centerLocation = {
      latitude: userLocation[1],
      longitude: userLocation[0],
    };

    const locations = pubLocations.map((location) => {
      return {
        city: location.city,
        id: location.id,
        location: location.location,
        image: location.image,
        group: location.group,
        date: location.date,
        title: location.title,
        latitude: location.coord[1],
        longitude: location.coord[0],
      };
    });

    const maxDistance = 25000;

    const nearbyPlaces = locations.filter((location) => {
      return geolib.isPointWithinRadius(location, centerLocation, maxDistance);
    });

    res.send(nearbyPlaces);
  })
);

module.exports = router;
