//create a model for gallery
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  name: String,
  description: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "groups",
  },
});

module.exports = mongoose.model("gallery", gallerySchema);
