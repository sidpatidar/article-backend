var express = require("express");
var router = express.Router();
var ManagerController = require("../Controller/ManagerController");
const EmployeeController = require("../Controller/EmployeeController");
router.post("/add_employee", function (req, res, next) {
  ManagerController.addEmployee(req, res, next);
});

router.get("/all_employees", function (req, res, next) {
  EmployeeController.getAllEmployees(req, res, next);
});

router.delete("/delete_employee", function (req, res, next) {
  ManagerController.deleteEmployee(req, res, next);
});
module.exports = router;
