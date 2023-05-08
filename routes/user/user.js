//create an express router that shows the user's profile
const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin");

router.get("/profile", async (req, res) => {
  //find admin by id

  const admin = await Admin.findOne({ userId: req.user._id }).populate(
    "groups"
  );

  res.render("main/userPage/userPage", { admin });
});

module.exports = router;
