const reviewsRouter = require('express').Router();
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews');

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/:id', getReview);
reviewsRouter.post('/', createReview);
reviewsRouter.put('/:id', updateReview);
reviewsRouter.delete('/:id', deleteReview);

module.exports = reviewsRouter;
