const { Error } = require("mongoose");
const JwtGeneration = require("../Auth/JwtConfig");
const User = require("../Models/User");

const AuthController = async (req, res, next) => {
  const user = req.body;
  if (user.username != null && user.password != null && user.role != null) {
    const query = {
      username: user.username,
      pasword: user.password,
      role: user.role,
    };

    await User.findOne(query).then((result) => {
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
          return res.status(400).json({ message: "Invalid Credentials" });
        }
      } catch (err) {
        next({ message: err.message });
      }
    });
  } else res.next({ message: "InComplete Credentials" });
};
module.exports = AuthController;
