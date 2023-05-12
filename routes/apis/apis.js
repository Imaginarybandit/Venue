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

    const publication = await publications.find({});

    //make a for loop for publication

    for (let i = 0; i < publication.length; i++) {
      const { city, zipcode } = publication[i];
      const location = `${city},Puerto Rico,${zipcode}`;
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=ip&access_token=${process.env.MAPBOX_KEY}&limit=1`
      );
      console.log(data.features[0].geometry.coordinates);
    }

    const centerLocation = { latitude: 18.1395323, longitude: -67.1265472 };

    const locations = [
      { name: "Guaynabo", latitude: 18.35745, longitude: -66.111 },
      { name: "Mayaguez", latitude: 18.2011161, longitude: -67.1391124 },
    ];
    const maxDistance = 20000;

    const nearbyPlaces = locations.filter((location) => {
      return geolib.isPointWithinRadius(location, centerLocation, maxDistance);
    });
    //console.log(nearbyPlaces);
    console.log(publication);
    res.send(data);
  })
);

module.exports = router;
