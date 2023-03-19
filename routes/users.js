var express = require("express");
const { Error } = require("mongoose");
var router = express.Router();
const AuthController = require("../Controller/AuthController");
var registerUser = require("../Controller/UserController");

router.post("/login", async (req, res, next) => {
  await AuthController(req, res, next);
});

router.post("/register", async (req, res, next) => {
  await registerUser(req, res, next);
});

module.exports = router;
