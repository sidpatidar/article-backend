var express = require('express');
var router = express.Router();
var AdminContoller  = require("../Controller/AdminContoller");
router.post('/add_users', function(req, res, next) {

  AdminContoller.addEmployeeOrManager(req, res, next);
  });
  
  module.exports = router;