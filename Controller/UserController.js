var User = require("../Models/User");

const registerUserController = (user) => {
  const newUser = new User({
    username: user.username,
    password: user.password,
  });
  return newUser.save().then(
    (res) => res,
    (err) => err
  );
};
const getUsersController = (loginUser) => {};
module.exports = getUsersController;
module.exports = registerUserController;
