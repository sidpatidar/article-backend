const registerUserController = require("./UserController");

const addEmployee = (req, res, next) => {
  const user = req.body;
  if (user.role == "EMP") {
    if (!user.managerId) {
      return res.status(400).json({ message: "managerId is requires" });
    }
    return registerUserController(req, res, next);
  }
  return res.status(400).json({ message: "Role  will be EMP" });
};
module.exports = { addEmployee };
