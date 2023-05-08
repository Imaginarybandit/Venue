const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const savedPublications = require("../../models/savedPublications");
const Publicacion = require("../../models/publications");
const Users = require("../../models/user");
const Groups = require("../../models/groups");
const catchAsync = require("../../utils/ErrorCatcher");
const { use } = require("passport");

//make a post router that sends an email to users
router.post(
  "/notification/:id",
  catchAsync(async function (req, res, next) {
    const { id } = req.params;
    const group = await Groups.findById(id);
    //find using the ids of the group publications the saved publications

    const userList = [];

    for (let i = 0; i < group.publications.length; i++) {
      let savedpublications = await savedPublications
        .find({
          publications: group.publications[i]._id,
        })
        .populate("publications");
      console.log(savedpublications);
      userList.push(savedpublications);
    }
    //do a for loop to find the users that have the saved publications
    //do a for loop thats loops through the userLists and finds the users

    for (let i = 0; i < userList[0].length; i++) {
      let user = await Users.findById({
        _id: userList[0][i].user,
      });
      console.log(user.email);

      const transporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass:
            process.env.ADMIN_EMAIL_PASSWORD_1 +
            "#" +
            process.env.ADMIN_EMAIL_PASSWORD_2,
        },
      });

      const mailOptions = {
        from: "marcos.santiago1@outlook.com",
        to: `${user.email}`,
        subject: `${userList[0][i].publications.title}`,
        text: "This is a test email sent using Nodemailer and Express.js!",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    console.log(group.publications);
    res.redirect("/profile");
  })
);

module.exports = router;
