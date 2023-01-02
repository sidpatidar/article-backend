var express = require("express");
var router = express.Router();
var AdminContoller = require("../Controller/AdminContoller");
router.post("/add_user", function (req, res, next) {
  AdminContoller.addEmployeeOrManager(req, res, next);
});
router.get("/delet_user/:_id", function (req, res, next) {
  AdminContoller.deleteUser(req, res, next);
});

module.exports = router;
