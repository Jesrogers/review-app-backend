const reviewsRouter = require('express').Router();
const { getReviews, getReview } = require('../controllers/reviews');

reviewsRouter.get('/', getReviews);
reviewsRouter.get('/:id', getReview);

module.exports = reviewsRouter;
