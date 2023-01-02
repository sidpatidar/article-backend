var createError = require("http-errors");
var dotenv = require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connect = require("./database");
var indexRouter = require("./routes/index");
var userRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var managerRouter = require("./routes/manager");
var authMiddleware= require('./Auth/AuthMiddleware')
var app = express();
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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/admin",authMiddleware.isAdmin, adminRouter);
app.use("/manager",authMiddleware.isManager, managerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use( (err, req, res, next)=> {

  res.status(500).send(err)
})
// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app;
