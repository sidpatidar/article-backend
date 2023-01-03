var User = require("../Models/User");
var mongoose = require("mongoose");
const registerUserController = async (req, res, next) => {
  const user = req.body;
  try {
    const userData = await User.findOne({ _id: user.managerId });
    if (userData) {
      const newUser = new User({
        username: user.username,
        password: user.password,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        managerId: user.managerId,
      });
      const savedUser = await newUser.save();
      if (savedUser) {
        return res.send({ message: "successfully added" });
      }
    } else {
      return res.status(500).send({ message: "managerId not found" });
    }
  } catch (err) {
    if (err.code == 11000) {
      return next({ message: "Already registered" });
    }
    return next({ message: err });
  }
};

const deleteUserController = async (req, res, next) => {
  try {
    const user = req.body;
    const _id = user.userId;
    const deletedUser = await User.deleteOne({ _id: _id });
    if (deletedUser) {
      return res.send({ message: "successfully deleted" });
    } else {
      return next({ message: "something went wrong" });
    }
  } catch (err) {
    return next({ message: err });
  }
};
module.exports = { registerUserController, deleteUserController };
