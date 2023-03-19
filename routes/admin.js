var express = require("express");
var router = express.Router();
const AdminContoller = require("../Controller/AdminContoller");
const EmployeeController = require("../Controller/EmployeeController");
router.post("/add_employee", function (req, res, next) {
  AdminContoller.addEmployee(req, res, next);
});
router.post("/add_manager", function (req, res, next) {
  AdminContoller.addManager(req, res, next);
});
router.delete("/delete_employee", function (req, res, next) {
  AdminContoller.deleteEmployee(req, res, next);
});
router.delete("/delete_manager", function (req, res, next) {
  AdminContoller.deleteManager(req, res, next);
});

router.get("/all_managers", function (req, res, next) {
  AdminContoller.getAllManager(req, res, next);
});

router.get("/all_employees", function (req, res, next) {
  EmployeeController.getAllEmployees(req, res, next);
});

module.exports = router;
