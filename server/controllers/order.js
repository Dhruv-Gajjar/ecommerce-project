const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });

    res.status(StatusCodes.OK).json(orders);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    res.status(StatusCodes.CREATED).json(savedOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json(updatedOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const deleteOrder = async (req, res) => {
  const order = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(order);

    res.status(StatusCodes.OK).json(deletedOrder);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

// Get Monthly Income
const getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(StatusCodes.OK).json(income);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getUserOrder,
  getMonthlyIncome,
};
