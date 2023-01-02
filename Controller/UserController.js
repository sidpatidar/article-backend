var User = require("../Models/User");

const registerUserController = async (req, res, next) => {
  const user = req.body;
  const newUser = new User({
    username: user.username,
    password: user.password,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
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
