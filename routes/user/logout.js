const express = require("express");
const router = express.Router();

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully");
    res.redirect("/");
  });
});

module.exports = router;
