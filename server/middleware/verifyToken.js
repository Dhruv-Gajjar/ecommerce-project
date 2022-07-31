const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(StatusCodes.FORBIDDEN).json("Invalid Token!");

      req.user = user;
      next();
    });
  } else {
    return res.status(StatusCodes.FORBIDDEN).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthentication = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(StatusCodes.FORBIDDEN).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthentication,
  verifyTokenAndAdmin,
};
