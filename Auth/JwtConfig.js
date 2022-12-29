import { Jwt } from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const JwtGeneration = (loginUser) => {
  const token = Jwt.sign(loginUser, jwtSecretKey);
};

export const JwtTokenValidator = (req, res, next) => {
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  try {
    const token = req.header(tokenHeaderKey);

    const verified = Jwt.verify(token, jwtSecretKey);
    if (verified) {
      return next();
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};
