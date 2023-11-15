const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../controllers/userController');

// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// /api/users
router.route('/')
    .get(asyncHandler(getAllUsers))
    .post(asyncHandler(createUser));

// /api/users/:userId
router.route('/:userId')
    .get(asyncHandler(getUserById))
    .put(asyncHandler(updateUser))
    .delete(asyncHandler(deleteUser));

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(asyncHandler(addFriend))
    .delete(asyncHandler(removeFriend));

module.exports = router;
