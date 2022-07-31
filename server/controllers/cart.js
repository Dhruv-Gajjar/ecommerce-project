const Cart = require("../models/Cart");
const { StatusCodes } = require("http-status-codes");

const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();

    res.status(StatusCodes.OK).json(carts);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getUserCart = async (req, res) => {
  const userCart = req.params.id;

  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    res.status(StatusCodes.OK).json(cart);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const createCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    res.status(StatusCodes.CREATED).json(savedCart);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json(updatedCart);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const deleteCart = async (req, res) => {
  const cart = req.params.id;

  try {
    const deletedCart = await Cart.findByIdAndDelete(cart);

    res.status(StatusCodes.OK).json(deletedCart);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getAllCart,
  getUserCart,
};
