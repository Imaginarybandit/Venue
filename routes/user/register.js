//create express router
const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const catchAsync = require("../../utils/ErrorCatcher");
const { userSchema } = require("../../public/middleware/joiSchemas/userSchema");
const {
  validateSchema,
} = require("../../public/middleware/joiSchemas/validateSchema");

//register form
router.get("/register", (req, res) => {
  res.render("user/register");
});

//write the router for registering with passport
router.post(
  "/register",
  validateSchema(userSchema),
  catchAsync(async (req, res) => {
    const { email, username, password, name, surname, city, zipcode } =
      req.body;
    const newUser = new User({ email, username, name, surname, city, zipcode });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.redirect("/profile");
    });
  })
);

router.get("/checkUsername", (req, res) => {
  const { username } = req.query;
  User.findOne({ username: username }).then((result) => {
    if (result) {
      res.send({ status: "Username already exists" });
    } else {
      res.send({ status: "Username is available" });
    }
  });
});

router.get("/checkEmail", (req, res) => {
  const { email } = req.query;
  User.findOne({ email: email }).then((result) => {
    if (result) {
      res.send({ status: "Email already exists" });
    } else {
      res.send({ status: "Email is available" });
    }
  });
});

module.exports = router;
