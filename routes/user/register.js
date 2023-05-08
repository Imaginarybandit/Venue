//create express router
const express = require("express");
const router = express.Router();
const User = require("../../models/user");

//register form
router.get("/register", (req, res) => {
  res.render("user/register");
});

//write the router for registering with passport
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, name, surname, city } = req.body;
    const newUser = new User({ email, username, name, surname, city });
    const registeredUser = await User.register(newUser, password);
    res.redirect("/");
  } catch (e) {
    console.log(e);
    res.redirect("register");
  }
});

module.exports = router;
