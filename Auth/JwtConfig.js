const  Jwt =require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;
 const JwtGeneration = (user) => {

  const loginUser={
    _id:user._id,
    username:user.username,
    role:user.role
  }
  const token = Jwt.sign(loginUser, jwtSecretKey);
  return token;
};

module.exports=JwtGeneration;
