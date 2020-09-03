const reviewsRouter = require('express').Router();
const authorizeJWT = require('../middleware/authorizeJWT');
const rateLimiter = require('../middleware/rateLimiter');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

reviewsRouter.get('/', authorizeJWT, getReviews);
reviewsRouter.get('/:id', authorizeJWT, getReview);
reviewsRouter.post('/', rateLimiter, authorizeJWT, createReview);
reviewsRouter.put('/:id', rateLimiter, authorizeJWT, updateReview);
reviewsRouter.delete('/:id', authorizeJWT, deleteReview);

module.exports = reviewsRouter;
