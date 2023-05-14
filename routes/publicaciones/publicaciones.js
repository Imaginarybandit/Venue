const express = require("express");
const router = express.Router();
const Publicacion = require("../../models/publications");
const Group = require("../../models/groups");
const Admin = require("../../models/admin");
const multer = require("multer");
const { storage } = require("../../cloudinary");
const catchAsync = require("../../utils/ErrorCatcher");
const upload = multer({ storage });
const {
  validateSchema,
} = require("../../public/middleware/joiSchemas/validateSchema");
const {
  editPublicationSchema,
  newPublicationSchema,
} = require("../../public/middleware/joiSchemas/publicationSchema");

//get a single activity
router.get("/publicacion", function (req, res, next) {
  res.render("main/publicaciones/publicacionConId");
});

//create a new activity
router.get(
  "/publicaciones",
  catchAsync(async function (req, res, next) {
    const publicaciones = await Publicacion.find({}).populate("group");
    res.render("main/publicaciones/publicaciones", { publicaciones });
  })
);

router.get(
  "/publicaciones/search",
  catchAsync(async (req, res) => {
    const { search } = req.query;
    const publicaciones = await Publicacion.find({
      title: { $regex: search, $options: "i" },
    }).populate("group");

    res.send(publicaciones);
  })
);

//make a get router for new  activities
router.get(
  "/publicacion/:id",
  catchAsync(async function (req, res, next) {
    //find a publication by id
    if (req.user && req.user.isAdmin) {
      const publicacion = await Publicacion.findById(req.params.id).populate(
        "group"
      );
      const group = await Group.findById(publicacion.group._id);
      const admin = await Admin.findById(group.admin);
      console.log(admin);
      res.render("main/publicaciones/publicacionConId", {
        publicacion,
        admin,
      });
    } else {
      const publicacion = await Publicacion.findById(req.params.id).populate(
        "group"
      );
      res.render("main/publicaciones/publicacionConId", {
        publicacion,
      });
    }
  })
);

//make a get router for new publicacion
router.get(
  "/:id/publicacion/new",
  catchAsync(async function (req, res, next) {
    const groupId = req.params.id;
    res.render("main/publicaciones/Nuevapublicacion", { groupId });
  })
);

router.post(
  "/:id/publicacion/new",
  upload.single("publicationImage"),
  validateSchema(newPublicationSchema),
  catchAsync(async function (req, res, next) {
    const groupId = req.params.id;

    const group = await Group.findById(groupId);

    const publicacion = new Publicacion({
      title: req.body.title,
      description: req.body.content,
      date: req.body.date,
      time: req.body.time,
      location: req.body.localizacion,
      zipcode: req.body.zipcode,
      city: req.body.city,
    });

    if (req.file) {
      publicacion.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    publicacion.group = groupId;

    publicacion.save();

    group.publications.push(publicacion._id);

    group.save();

    res.redirect(`/publicacion/${publicacion._id}`);
  })
);

//make a router for edit
router.get(
  "/publicacion/:id/edit",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const publicacion = await Publicacion.findById(id);
    res.render("main/publicaciones/editPublicacion", { publicacion });
  })
);

router.delete(
  "/publicacion/:id",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const groupId = await Publicacion.findById(id);
    const group = await Group.findById(groupId.group);
    await Publicacion.findByIdAndDelete(id);
    group.publications.pull(id);
    group.save();
    res.redirect(`/groups/${group._id}`);
  })
);

router.patch(
  "/publicacion/:id",
  upload.single("publImage"),
  validateSchema(editPublicationSchema),
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const { title, description, date, localizacion, city, zipcode } = req.body;
    //find the activity by id and update it

    const newdate = new Date(date);

    const publicacion = await Publicacion.findByIdAndUpdate(id, {
      title: title,
      description: description,
      location: localizacion,
      city: city,
      zipcode: zipcode,
    });

    if (newdate.toString() === "Invalid Date") {
      console.log(`${date} is not a valid date`);
    } else {
      publicacion.date = newdate;
    }

    if (req.file) {
      const publicacion = await Publicacion.findByIdAndUpdate(id, {
        image: {
          url: req.file.path,
          filename: req.file.filename,
        },
      });
    }
    publicacion.save();
    req.flash("success", "Publicacion actualizada");
    res.redirect(`/publicacion/${id}`);
  })
);

//make a middleware that checks the current users publication and the publication date

module.exports = router;
