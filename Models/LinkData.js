const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const LinkData = new mongoose.Schema({
  linkDataId: ObjectId,
  date: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  projectId: {
    type: ObjectId,
  },
  domainId: {
    type: ObjectId,
  },
  editedByUserId: {
    type: String,
  },
});

module.exports = mongoose.model("LinkData", LinkData);
