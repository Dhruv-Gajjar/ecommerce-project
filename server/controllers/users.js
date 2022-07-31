const User = require("../models/Users");
const { StatusCodes } = require("http-status-codes");

const getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find({});
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getSingleUsers = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    const { password, ...others } = users._doc;

    res.status(StatusCodes.OK).json(others);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const createUsers = async (req, res) => {
  const user = req.body;
  const newUser = await User.create(user);

  res.status(StatusCodes.CREATED).json(newUser);
};

const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json(updatedUser);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json("User has been deleted");
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.getFullYear() - 1);

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(StatusCodes.OK).json(data);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  getAllUsers,
  createUsers,
  updateUser,
  deleteUser,
  getSingleUsers,
  getUserStats,
};
