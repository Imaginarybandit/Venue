//create a router for admin
const express = require("express");
const router = express.Router();
const Admin = require("../../models/admin");
const User = require("../../models/user");

router.post("/admin/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.isAdmin = true;
  user.save();
  const newAdmin = new Admin({ userId: id });
  newAdmin.save();
  console.log(user.isAdmin);
  res.redirect("/profile");
});

module.exports = router;
