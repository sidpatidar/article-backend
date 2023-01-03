const UserController = require("./UserController");
var User = require("../Models/User");
var mongoose = require("mongoose");
const addEmployee = async (req, res, next) => {
  const user = req.body;
  if (user.managerId && user.role == "EMP") {
    await UserController.registerUserController(req, res, next);
  } else {
    return res
      .status(500)
      .send({ message: "managerId require with employee only" });
  }
};
const deleteEmployee = async (req, res, next) => {
  const user = req.body;
  if (user.role == "EMP") {
    await UserController.deleteUserController(req, res, next);
  } else {
    return next({ message: "User is not Employee" });
  }
};
const deleteManager = async (req, res, next) => {
  const user = req.body;
  if (user.role == "MNG") {
    const employees = await User.find({ managerId: user.userId });
    if (employees.length > 0) {
      return next({ message: "This manager is assigned to  employees" });
    } else {
      return await UserController.deleteUserController(req, res, next);
    }
  } else {
    return next({ message: "User is not manager" });
  }
};
module.exports = { addEmployee, deleteEmployee, deleteManager };
