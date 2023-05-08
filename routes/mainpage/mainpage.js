//make a router for the main page and export it
const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin");
const Group = require("../../models/groups");
const Publicaciones = require("../../models/publications");

router.get("/", async (req, res) => {
  const groups = await Group.find().populate("admin");
  const publications = await Publicaciones.find().populate("group");
  res.render("main/mainpage", { groups, publications });
});

module.exports = router;
