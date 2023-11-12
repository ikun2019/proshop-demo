const asyncHandler = require('../middlewares/asyncHandler.js');
const User = require('../models/User.js');

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(401);
    throw new Error('emailもしくはpasswordが間違っています');
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(401);
    throw new Error('emailもしくはpasswordが間違っています');
  }
  User.getJwtToken(res, user);
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc Register user
// @route POST /api/users
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists');
  };
  const user = await User.create({
    name,
    email,
    password
  });
  if (user) {
    User.getJwtToken(res, user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
exports.logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({
    message: 'Logged out successfully'
  });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User is not found!');
  };
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  };
});

// @desc  Get users
// @route GET /api/users
// @access Private/Admin
exports.getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
exports.getUserByID = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// @desc Delete users
// @route DELETE /api/users/:id
// @access Private/Admin
exports.deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @desc Update user
// @route /api/users/:id
// @access Private/Admin
exports.updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});