const UserController = require("./UserController");
const AuthMiddleware = require("../Auth/AuthMiddleware");
const addEmployee = (req, res, next) => {
  const user = req.body;
  if (user.managerId && user.role == "EMP") {
    const verified = AuthMiddleware.tokenDetail(req);
    if (user.managerId == verified._id) {
      return UserController.registerUserController(req, res, next);
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
module.exports = { addEmployee };
