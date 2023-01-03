var express = require("express");
var router = express.Router();
var AdminContoller = require("../Controller/AdminContoller");
router.post("/add_employee", function (req, res, next) {
  AdminContoller.addEmployee(req, res, next);
});
router.delete("/delet_employee", function (req, res, next) {
  AdminContoller.deleteEmployee(req, res, next);
});
router.delete("/delet_manager", function (req, res, next) {
  AdminContoller.deleteManager(req, res, next);
});

module.exports = router;
