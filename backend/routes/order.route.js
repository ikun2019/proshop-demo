const router = require('express').Router();
const { addOrderItems, getOrders, getOrderById, getMyOrders, updateOrderToPaid, updateOrderToDelivered } = require('../controllers/order.controller.js');
const { protect, admin } = require('../middlewares/authMiddleware.js');

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

module.exports = router;