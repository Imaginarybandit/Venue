//create mongoose schema for notifications
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  publicationId: {
    type: Schema.Types.ObjectId,
    ref: "publications",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "groups",
  },
  image: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("notifications", NotificationSchema);
