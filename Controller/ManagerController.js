const UserController = require("./UserController");
const AuthMiddleware = require("../Auth/AuthMiddleware");

var User = require("../Models/User");
const addEmployee = (req, res, next) => {
  const user = req.body;
  if (user.managerId && user.role == "EMP") {
    const verified = AuthMiddleware.tokenDetail(req);
    if (user.managerId == verified._id) {
      return UserController.registerUser(req, res, next);
    } else {
      return res
        .status(500)
        .send({ message: "Cannot assigned employee to other manager" });
    }
  } else {
    return res
      .status(500)
      .send({ message: "managerId require with employee only" });
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

module.exports = { addEmployee, deleteEmployee };
