const express = require("express");
const router = express.Router();
const Group = require("../../models/groups");
const User = require("../../models/user");
const Admin = require("../../models/admin");
const Gallery = require("../../models/gallery");
const { isLoggedIn } = require("../../utils/IsLoggedIn");
const multer = require("multer");
const { storage } = require("../../cloudinary");
const upload = multer({ storage });

router.get("/groups", async (req, res) => {
  const groups = await Group.find({});
  res.render("main/groups/searchGroup", { groups });
});

router.get("/groups/search", async (req, res) => {
  const { search } = req.query;
  const groups = await Group.find({ name: { $regex: search, $options: "i" } });
  res.send(groups);
});

router.get("/groups/new", isLoggedIn, (req, res) => {
  res.render("main/groups/createGroup");
});

router.get("/groups/:id/edit", async (req, res) => {
  const { id } = req.params;
  const group = await Group.findById(id);
  res.render("main/groups/editGroup", { group });
});

router.post("/groups", upload.single("groupImage"), async (req, res) => {
  const { groupName, groupDescription, website } = req.body;
  const filename = req.file.filename;
  const url = req.file.path;
  const admin = await Admin.findOne({ userId: req.user._id });

  const group = new Group({
    name: groupName,
    description: groupDescription,
    website: website,
    admin: admin._id,
    posterimage: {
      url: url,
      filename: filename,
    },
  });

  await group.save();

  admin.groups.push(group._id);
  await admin.save();

  res.redirect(`/groups/${group._id}`);
});

router.get("/groups/:id", async (req, res) => {
  const { id } = req.params;
  if (req.user && req.user.isAdmin) {
    const group = await Group.findById(id)
      .populate("admin")
      .populate("publications");

    const gallery = await Gallery.findOne({ groupId: id });

    const admin = await Admin.findById(group.admin).populate("groups");

    res.render("main/groups/showGroup", { group, admin, gallery });
  } else {
    const group = await Group.findById(id)
      .populate("admin")
      .populate("publications");
    const gallery = await Gallery.findOne({ groupId: id });

    res.render("main/groups/showGroup", { group, gallery });
  }
  //find group by id
});

//make a delete router

router.delete("/groups/:id", async (req, res) => {
  const { id } = req.params;

  const group = await Group.findOneAndDelete({ _id: id });

  res.redirect("/profile");
});

//make a patch router

router.patch("/groups/:id", upload.single("groupImage"), async (req, res) => {
  const { id } = req.params;
  const { groupName, groupDescription, website, phone, email } = req.body;
  //find group by id and update
  const group = await Group.findByIdAndUpdate(id, {
    name: groupName,
    description: groupDescription,
    website: website,
    phone: phone,
    email: email,
  });

  if (req.file) {
    const groupImg = await Group.findByIdAndUpdate(id, {
      posterimage: {
        url: req.file.path,
        filename: req.file.filename,
      },
    });
  }

  res.redirect("/groups/" + id);
});

module.exports = router;
