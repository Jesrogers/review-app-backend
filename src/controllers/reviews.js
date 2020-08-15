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
  } catch (err) {
    logger.error(err);
  }
};

const createReview = async (req, res) => {
  const { title, description, rating } = req.body;

  if (!title || title.length > 100) {
    return res
      .status(400)
      .json({ error: 'Review title missing or above 100 characters' });
  }

  if (description.length > 300) {
    return res
      .status(400)
      .json({ error: 'Review description above 300 characters' });
  }

  if (!rating || typeof rating !== 'number') {
    return res
      .status(400)
      .json({ error: 'Review rating missing or not a number' });
  }

  try {
    const savedReview = await db.query(
      'INSERT INTO review (title, description, rating) VALUES ($1, $2, $3) RETURNING id',
      [title, description, rating]
    );

    const savedReviewId = savedReview.rows[0].id;

    const newReview = {
      id: savedReviewId,
      title: title,
      description: description,
      rating: rating,
    };

    res.status(201).json(newReview);
  } catch (err) {
    logger.error(err);
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
};
