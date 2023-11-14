const asyncHandler = require('../middlewares/asyncHandler.js');
const Order = require('../models/Order.js');

// @desc Create new Order
// @router POST /api/orders
// @access Private
exports.addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
  res.send('add order items');
});

// @desc Get logged in user orders
// @router GET /api/orders/myorders
// @access Private
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc Get order bt ID
// @router GET /api/orders/:id
// @access Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc Update order to paid
// @router GET /api/orders/:id/pay
// @access Private
exports.updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order to paid');
});

// @desc Update order to delivered
// @router GET /api/orders/:id/deliver
// @access Private/Admin
exports.updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order to delivered');
});

// @desc Get all orders
// @router GET /api/orders
// @access Private/Admin
exports.getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});