const groups = require("../../models/groups");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage, cloudinary } = require("../../cloudinary");
const upload = multer({ storage });
const catchAsync = require("../../utils/ErrorCatcher");
const Gallery = require("../../models/gallery");

router.get(
  "/upload/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    res.render("main/gallery/upload", { id });
  })
);

router.post(
  "/upload/:id",
  upload.array("galleryImage"),
  catchAsync(async (req, res) => {
    const { id } = req.params;

    const gallery = await Gallery.find({ groupId: id });

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
      gallery[0].images.push(
        ...req.files.map((f) => ({
          url: f.path,
          filename: f.filename,
        }))
      );
      await gallery[0].save();
      res.redirect(`/groups/${id}`);
    }
  })
);

router.delete(
  "/gallery/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { deleteImage } = req.body;
    console.log(deleteImage);

    await Gallery.findOneAndUpdate(
      { groupId: id },
      { $pull: { images: { filename: { $in: deleteImage } } } }
    );
    await cloudinary.uploader.destroy(deleteImage);
    res.redirect(`/groups/${id}`);
  })
);

module.exports = router;
