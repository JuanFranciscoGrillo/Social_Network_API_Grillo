const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../controllers/thoughtController');

// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// /api/thoughts
router.route('/')
    .get(asyncHandler(getAllThoughts))
    .post(asyncHandler(createThought));

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(asyncHandler(getThoughtById))
    .put(asyncHandler(updateThought))
    .delete(asyncHandler(deleteThought));

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(asyncHandler(addReaction));

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(asyncHandler(removeReaction));

module.exports = router;
