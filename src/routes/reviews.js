const reviewsRouter = require('express').Router();

reviewsRouter.get('/', (req, res) => {
  res.json('Get review endpoint');
});

module.exports = reviewsRouter;
