const db = require('../db');
const logger = require('../utils/logger');

const getReviews = async (req, res) => {
  try {
    const reviews = await db.query('SELECT * FROM review');
    res.status(200).json(reviews.rows);
  } catch (e) {
    logger.error(e);
  }
};

const getReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await db.query('SELECT * FROM review WHERE id = $1', [
      reviewId,
    ]);

    if (review.rows.length) {
      res.status(200).json(review.rows);
    } else {
      res.status(404).end();
    }
  } catch (e) {
    logger.error(e);
  }
};

module.exports = {
  getReviews,
  getReview,
};
