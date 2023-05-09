//create express router
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const catchAsync = require("../../utils/ErrorCatcher");

//register form
router.get("/register", (req, res) => {
  res.render("user/register");
});

//write the router for registering with passport
router.post(
  "/register",
  catchAsync(async (req, res) => {
    const { email, username, password, name, surname, city } = req.body;
    const newUser = new User({ email, username, name, surname, city });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/profile");
    });
  })
);

module.exports = router;
