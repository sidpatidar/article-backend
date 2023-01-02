const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const User = new mongoose.Schema({
  userId: ObjectId,
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum :['EMP','MNG','ADMIN']
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  managerId:{
    type:String,
   
  }
});

module.exports = mongoose.model("User", User);
