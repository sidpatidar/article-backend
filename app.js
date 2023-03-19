var createError = require("http-errors");
var dotenv = require("dotenv").config();
var express = require("express");
var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connect = require("./database");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var managerRouter = require("./routes/manager");
var articleRouter = require("./routes/article");
var domainRouter = require("./routes/domain");
var projectRouter = require("./routes/project");
var authMiddleware = require("./Auth/AuthMiddleware");
var app = express();
const fileupload = require("express-fileupload");
app.use(cors());
connect().then(
  () => {
    console.log("Database connected");
  },
  (error) => {
    console.log(error);
  }
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileupload());
app.use(express.static("files"));
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/admin", authMiddleware.isAdmin, adminRouter);
app.use("/manager", authMiddleware.isManager, managerRouter);
app.use("/article", authMiddleware.isUser, articleRouter);
app.use("/domain", domainRouter);
app.use("/project", projectRouter);
app.use(function (req, res, next) {
  next(createError(404));
});
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

module.exports = app;
