const jwtSecretKey = process.env.JWT_SECRET_KEY;
const Jwt = require("jsonwebtoken");
const isUser = (req, res, next) => {
  try {
    const verified=tokenDetail(req);
    if (verified) {
      return next();
    } else {
      return res.status(500).send({ message: "User Not Found" });
    }
  } catch (error) {
    return res.send(error);
  }
};
const isManager = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).send({ message: "Unauthorised User" });
  }
  const verified=tokenDetail(req);
  if (verified.role == "MNG") {
    return next();
  }
  return res.status(400).send({ message: "Unauthorised User" });
};

const isAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
  
    return res.status(400).send({ message: "Unauthorised User" });
  }
  const verified=tokenDetail(req);
  if (verified.role == "ADMIN") {
    return next();
  }
  return res.status(400).send({ message: "Unauthorised User" });
};

const tokenDetail=(req)=>{
  const token = req.headers.authorization.replace("Bearer ", "");
  const verified = Jwt.verify(token, jwtSecretKey);
  return verified;
}

module.exports = { isUser, isManager, isAdmin ,tokenDetail};
