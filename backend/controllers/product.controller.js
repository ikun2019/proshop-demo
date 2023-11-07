const asyncHandler = require('../middlewares/asyncHandler.js');
const Product = require('../models/Product.js');

// @desc get all products
// @route GET /api/products
// @access public
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc get single product
// @route /api/products/:id
// @access public
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
  }
});