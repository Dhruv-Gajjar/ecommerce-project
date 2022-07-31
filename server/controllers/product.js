const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const getAllProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategories = req.query.categories;

  try {
    let product;

    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategories) {
      product = await Product.find({
        categories: {
          $in: [qCategories],
        },
      });
    } else {
      product = await Product.find();
    }

    res.status(StatusCodes.OK).json(product);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const getSingleProduct = async (req, res) => {
  const product = req.params.id;

  try {
    const singleProduct = await Product.findById(product);

    res.status(StatusCodes.OK).json(singleProduct);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    res.status(StatusCodes.CREATED).json(savedProduct);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(StatusCodes.OK).json(updatedProduct);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

const deleteProduct = async (req, res) => {
  const product = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(product);

    res.status(StatusCodes.OK).json(deletedProduct);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
};
