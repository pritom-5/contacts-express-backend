const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (!!authHeader) {
    token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Something went wrong");
    }
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401);
        console.log(err);
        throw new Error("User not authorized");
      }

      // intercepting router to check if the user
      // have access token if so add user creds to
      // req obj
      req.user = decoded.user;
      next();
    });
  }
});

module.exports = validateToken;
