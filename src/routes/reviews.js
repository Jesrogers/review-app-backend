const reviewsRouter = require('express').Router();
const authorizeJWT = require('../middleware/authorizeJWT');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

reviewsRouter.get('/', authorizeJWT, getReviews);
reviewsRouter.get('/:id', authorizeJWT, getReview);
reviewsRouter.post('/', authorizeJWT, createReview);
reviewsRouter.put('/:id', authorizeJWT, updateReview);
reviewsRouter.delete('/:id', authorizeJWT, deleteReview);

module.exports = reviewsRouter;
