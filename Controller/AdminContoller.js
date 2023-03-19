const UserController = require("./UserController");
const User = require("../Models/User");
const objectConverter = require("../Util/ObjectConverter");

const addEmployee = async (req, res, next) => {
  const user = req.body;
  if (user.managerId && user.role == "EMP") {
    await UserController.registerUser(req, res, next);
  } else {
    return res.status(500).send({
      message: "managerId require with employee only",
    });
  }
};

const addManager = async (req, res, next) => {
  const user = req.body;
  if (user.role == "MNG") {
    await UserController.registerUser(req, res, next);
  } else {
    return res.next({
      message: "User is not manager",
    });
  }
};

const deleteEmployee = async (req, res, next) => {
  const user = req.body;

  if (user.role == "EMP") {
    await UserController.deleteUser(req, res, next);
  } else {
    return next({ message: "User is not Employee" });
  }
};
const deleteManager = async (req, res, next) => {
  const user = req.body;
  if (user.role == "MNG") {
    const employees = await User.find({ managerId: user._id, role: "EMP" });
    if (employees.length > 0) {
      return next({ message: "This manager is assigned to  employees" });
    } else {
      return await UserController.deleteUser(req, res, next);
    }
  } else {
    return next({ message: "User is not manager" });
  }
};

const getAllManager = async (req, res, next) => {
  const result = User.find({ role: "MNG" });
  result
    .then((data) => {
      const managersifoList =
        objectConverter.managerListToManagerInfoList(data);
      return res.send({
        message: "Successfully fetched",
        data: managersifoList,
      });
    })
    .catch((err) => {
      return next({ message: "Something Went Wrong" });
    });
};

module.exports = {
  addEmployee,
  addManager,
  deleteEmployee,
  deleteManager,
  getAllManager,
};
