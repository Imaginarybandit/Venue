//create a  mongoose schema
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  savedPublications: [
    {
      type: Schema.Types.ObjectId,
      ref: "savedPublications",
    },
  ],
  phone: {
    type: String,
    required: false,
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("users", UserSchema);
