//create routers for express
const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  validateSchema,
} = require("../../public/middleware/joiSchemas/validateSchema");
const {
  loginSchema,
} = require("../../public/middleware/joiSchemas/userSchema");

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post(
  "/login",
  validateSchema(loginSchema),
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/");
  }
);

module.exports = router;
