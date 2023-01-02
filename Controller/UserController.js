var User = require("../Models/User");
var mongoose = require("mongoose");
const registerUserController = async (req, res, next) => {
  const user = req.body;
  if (user.role == "EMP") {
    console.log(user.managerId);
    var managerId = mongoose.Types.ObjectId(user.managerId);
    return User.findById(managerId).then((result) => {
      if (!result) {
        return res.send({ message: "Manager not exist" });
      }
    });
  }
  const newUser = new User({
    username: user.username,
    password: user.password,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    managerId: user.managerId,
  });
  newUser
    .save()
    .then((result) => {
      return res.send({ message: "successfully added" });
    })
    .catch((err) => {
      if (err.code == 11000) {
        return res.send({ message: "Already registered" });
      }
      return next({ error: err.stack });
    });
};

module.exports = registerUserController;
