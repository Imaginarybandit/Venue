//create an express router that shows the user's profile
const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin");
const User = require("../../models/user");

router.get("/profile", async (req, res) => {
  //find admin by id

  const admin = await Admin.findOne({ userId: req.user._id }).populate(
    "groups"
  );

  res.render("main/userPage/userPage", { admin });
});

router.get("/profile/edit", async (req, res) => {
  res.render("main/userPage/editUserPage");
});

//make a patch request to update the user's profile
router.patch("/profile/edit/:id", async (req, res) => {
  const { id } = req.params;

  const { username, name, surname, city, phone, email } = req.body;
  console.log(req.body);
  if (username === req.user.username) {
    const user = await User.findByIdAndUpdate(id, {
      name,
      surname,
      city,
      phone,
      email,
    });
    res.redirect("/profile");
  } else {
    const user = await User.findByIdAndUpdate(id, {
      username,
      name,
      surname,
      city,
      phone,
      email,
    });
    res.redirect("/");
  }
});

module.exports = router;
