const JwtTokenValidator = (req,res,next) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    try {
      const token = req.header(tokenHeaderKey);
  
      const verified = Jwt.verify(token, jwtSecretKey);
      if (verified) {
        return next();
      } else {
        return res.send(error);
      }
    } catch (error) {
      return res.send(error);
    }
  };
  module.exports=JwtTokenValidator;