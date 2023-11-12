const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler.js');
const User = require('../models/User.js');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('認証されていません');
    }
  } else {
    res.status(401);
    throw new Error('認証されていません');
  }
});

// Admin routes
exports.admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('admin認証されていません');
  }
};