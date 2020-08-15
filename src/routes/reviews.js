const reviewsRouter = require('express').Router();
const {
  getReviews,
  getReview,
  createReview,
} = require('../controllers/reviews');

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/:id', getReview);
reviewsRouter.post('/', createReview);

module.exports = reviewsRouter;
