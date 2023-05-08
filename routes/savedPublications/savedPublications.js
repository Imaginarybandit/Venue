const express = require("express");
const router = express.Router();
const savedPublications = require("../../models/savedPublications");
const publications = require("../../models/publications");
const users = require("../../models/user");
const catchAsync = require("../../utils/ErrorCatcher");

router.get(
  "/getSavedPublications",
  catchAsync(async (req, res) => {
    const savedPublication = await savedPublications
      .find({ user: req.user._id })
      .populate("publications");
    res.render("main/savedPublications/savedPublications", {
      savedPublication,
    });
  })
);

router.post(
  "/savePublication",
  catchAsync(async (req, res) => {
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
  })
);

//make a delete route for saved publications
router.delete(
  "/deleteSavedPublication/:id/",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const publicationId = req.body.publicationId;
    //find the saved publication and removed it from the savedPublication list
    const savedPublication = await savedPublications.findByIdAndDelete(id);

    res.redirect("/getSavedPublications");
  })
);

module.exports = router;
