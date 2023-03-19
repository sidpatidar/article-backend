const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://rajpatidar:rajofficial123@cluster0.chs4oeu.mongodb.net/articleCreatore?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  );
};

module.exports = connect;
