//create a mongoose schema for publications
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PublicationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  group: {
    type: Schema.Types.ObjectId,
    ref: "groups",
  },
  image: {
    url: String,
    filename: String,
  },

  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("publications", PublicationSchema);
