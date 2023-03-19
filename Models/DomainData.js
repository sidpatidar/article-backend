const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const DomainData = new mongoose.Schema({
  domainId: ObjectId,
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  da: {
    type: Number,
    required: true,
  },
  ss: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  niche: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  isFollow: {
    type: String,
    required: true,
  },
  isPaid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DomainData", DomainData);
