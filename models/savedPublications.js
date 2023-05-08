const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SavedPublicationSchema = new Schema({
  publications: {
    type: Schema.Types.ObjectId,
    ref: "publications",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});
module.exports = mongoose.model("savedPublications", SavedPublicationSchema);
