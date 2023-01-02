const { Error } = require("mongoose");
const JwtGeneration = require("../Auth/JwtConfig");
const User = require("../Models/User");

const AuthController = async (req, res, next) => {
  const user = req.body;
  if (user.username != null && user.password != null && user.role != null)
    await User.findOne(user).then(async (result) => {
      try {
        if (result != null && result) {
          const token = JwtGeneration(result);
          return res.json({
            data: {
              id: result._id,
              auth_ac: token,
            },
            message: "User Loggedin",
          });
        } else {
          return res.status(400).json({
            message: "Invalid Credentials",
          });
        }
      } catch (err) {
        next({ error: err.stack });
      }
    });
  else
    res.status(400).json({
      message: "InComplete Credentials",
    });
};
module.exports = AuthController;
