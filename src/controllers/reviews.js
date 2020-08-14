const db = require('../db');

const getReviews = async (req, res) => {
  try {
    const reviews = await db.query('SELECT * FROM review');
    res.status(200).json(reviews.rows);
  } catch (e) {
    console.error(e);
  }
};

const getReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await db.query('SELECT * FROM review WHERE id = $1', [
      reviewId,
    ]);
    res.status(200).json(review.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getReviews,
  getReview,
};
