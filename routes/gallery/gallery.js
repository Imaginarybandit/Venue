const groups = require("../../models/groups");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage, cloudinary } = require("../../cloudinary");
const upload = multer({ storage });
const Gallery = require("../../models/gallery");
const gallery = require("../../models/gallery");

router.get("/upload/:id", async (req, res) => {
  const { id } = req.params;
  res.render("main/gallery/upload", { id });
});

router.post("/upload/:id", upload.array("galleryImage"), async (req, res) => {
  const { id } = req.params;
  //find gallery by id
  const gallery = await Gallery.find({ groupId: id });

  //if gallery doesn't exist, create a new one
  if (gallery.length <= 0) {
    const newgallery = new Gallery({
      images: req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      })),
      groupId: id,
    });
    await newgallery.save();
    res.redirect(`/groups/${id}`);
  } else {
    //if gallery exists, push the new images to the array
    gallery[0].images.push(
      ...req.files.map((f) => ({
        url: f.path,
        filename: f.filename,
      }))
    );
    await gallery[0].save();
    res.redirect(`/groups/${id}`);
  }
});

router.delete("/gallery/:id", async (req, res) => {
  const { id } = req.params;
  const { deleteImage } = req.body;
  console.log(deleteImage);
  //delete the image from cloudinary

  await Gallery.findOneAndUpdate(
    { groupId: id },
    { $pull: { images: { filename: { $in: deleteImage } } } }
  );
  await cloudinary.uploader.destroy(deleteImage);
  res.redirect(`/groups/${id}`);
});

module.exports = router;
