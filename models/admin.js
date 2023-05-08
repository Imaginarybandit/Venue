//create a mongoose schema for admin
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("admins", AdminSchema);
