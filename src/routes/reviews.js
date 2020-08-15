const reviewsRouter = require('express').Router();
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
} = require('../controllers/reviews');

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/:id', getReview);
reviewsRouter.post('/', createReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
