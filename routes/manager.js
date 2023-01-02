var express = require('express');
var router = express.Router();
var ManagerController = require("../Controller/ManagerController");
router.post('/add_employee', function(req, res, next) {

    ManagerController.addEmployee(req, res, next);
  });
  
  module.exports = router;