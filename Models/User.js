const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const User = new mongoose.Schema({
  userId: ObjectId,
  username: {
    type: String,
    unique: true,
  },
  password: String,
});
module.exports = mongoose.model("User", User);
