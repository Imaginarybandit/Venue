const express = require("express");
const router = express.Router();
const savedPublications = require("../../models/savedPublications");
const publications = require("../../models/publications");
const users = require("../../models/user");

router.get("/getSavedPublications", async (req, res) => {
  const savedPublication = await savedPublications
    .find({ user: req.user._id })
    .populate("publications");

  //const publication = await publications.find();
  //res.render("main/savedPublications/savedPublications", { user });
  res.render("main/savedPublications/savedPublications", { savedPublication });
});

router.post("/savePublication", async (req, res) => {
  const publicationId = req.body.publicationId;
  const newSavedPublication = new savedPublications({
    publications: publicationId,
    user: req.user._id,
  });
  await newSavedPublication.save();
  const user = await users.findById(req.user._id);
  user.savedPublications.push(newSavedPublication);
  await user.save();
  res.send(newSavedPublication);
});

//export router
module.exports = router;
