const router = require('express').Router();
const { getUsers, registerUser, logoutUser, authUser, getUserProfile, updateUserProfile, deleteUser, getUserByID, updateUser } = require('../controllers/user.controller.js');
const { protect, admin } = require('../middlewares/authMiddleware.js');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserByID).put(protect, admin, updateUser);

module.exports = router;