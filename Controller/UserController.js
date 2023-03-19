var User = require("../Models/User");
var bcryptjs = require("bcryptjs");
const { generateRandomPassword } = require("../Util/Utility");
const { welcomeEmailSender } = require("../Util/EmailSender");
const registerUser = async (req, res, next) => {
  const user = req.body;
  try {
    const randomPassword = generateRandomPassword();
    let newOne;
    if (user.managerId != null) {
      const userData = await User.findOne({ _id: user.managerId });
      if (!userData) {
        return res.status(500).send({ message: "managerId not found" });
      }
      newOne = {
        username: user.username,
        password: bcryptjs.hashSync(
          randomPassword,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        ),
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        managerId: user.managerId,
      };
    } else {
      newOne = {
        username: user.username,
        password: bcryptjs.hashSync(
          randomPassword,
          "$2a$10$CwTycUXWue0Thq9StjUM0u"
        ),
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    }

    const newUser = new User(newOne);
    const savedUser = await newUser.save();
    if (savedUser) {
      const { username, role } = savedUser;
      welcomeEmailSender(randomPassword, username, role);
      return res.send({ message: "Successfully Added" });
    }
  } catch (err) {
    if (err.code == 11000) {
      return next({ message: "Already registered" });
    }

    return next({ message: err.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.body;
    const _id = user._id;
    const deletedUser = await User.deleteOne({ _id: _id });
    if (deletedUser) {
      return res.send({ message: "User Successfully deleted" });
    } else {
      return next({ message: "Something Went Wrong" });
    }
  } catch (err) {
    return next({ message: err.message });
  }
};
module.exports = { registerUser, deleteUser };
