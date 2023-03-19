const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const Article = new mongoose.Schema({
  articleId: ObjectId,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  created_Date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Article", Article);
