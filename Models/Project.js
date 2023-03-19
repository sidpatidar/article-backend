const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Project = new mongoose.Schema({
  projectId: ObjectId,
  projectName: {
    type: String,
    required: true,
  },
  projectCode: {
    type: String,
    required: true,
  },
  projectUrl: {
    type: String,
  },
  projectDetails: {
    type: String,
  },
  clientName: {
    type: String,
  },
  companyName: {
    type: String,
  },
});

module.exports = mongoose.model("Project", Project);
