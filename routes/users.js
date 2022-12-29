const { json } = require("express");
var express = require("express");
var router = express.Router();
var registerUserController = require("../Controller/UserController");
var getUsersController = require("../Controller/UserController");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", (req, res, next) => {
  getUsersController(req.body)
    .then((result) => {
      if (result.code != 11000) res.send({ message: "successfully added" });
      else res.send({ message: "Already registered" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "error", data: err });
    });
});

module.exports = router;
