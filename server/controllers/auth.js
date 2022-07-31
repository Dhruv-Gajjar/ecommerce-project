const User = require("../models/Users");
const { StatusCodes } = require("http-status-codes");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString(),
    });

    const savedUser = await newUser.save();
    res.status(StatusCodes.CREATED).json(savedUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(StatusCodes.UNAUTHORIZED).json("Invalid Credentials");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    originalPassword !== req.body.password &&
      res.status(StatusCodes.UNAUTHORIZED).json("Invalid Credentials");

    const { password, ...others } = user._doc;

    res.status(StatusCodes.OK).json({ ...others, accessToken });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};

module.exports = { register, login };
