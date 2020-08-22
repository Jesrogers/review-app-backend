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
      res.status(200).json(review.rows[0]);
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

  if (typeof rating !== 'number' && rating > 0 && rating <= 5) {
    return res.status(400).json({ error: 'Review rating not valid' });
  }

  try {
    const savedReview = await db.query(
      'INSERT INTO review (title, description, rating) VALUES ($1, $2, $3) RETURNING id, title, description, rating',
      [title, description, rating]
    );

    const newReview = {
      id: savedReview.rows[0].id,
      title: savedReview.rows[0].title,
      description: savedReview.rows[0].description,
      rating: savedReview.rows[0].rating,
    };

    res.status(201).json(newReview);
  } catch (err) {
    logger.error(err);
  }
};

const updateReview = async (req, res) => {
  const { id, title, description, rating } = req.body;

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

  if (typeof rating !== 'number') {
    return res
      .status(400)
      .json({ error: 'Review rating missing or not a number' });
  }

  try {
    const updatedReview = await db.query(
      'UPDATE review SET title = $1, description = $2, rating = $3 WHERE id = $4 RETURNING title, description, rating, id',
      [title, description, rating, id]
    );

    const newReview = {
      id: updatedReview.rows[0].id,
      title: updatedReview.rows[0].title,
      description: updatedReview.rows[0].description,
      rating: updatedReview.rows[0].rating,
    };

    res.status(200).json(newReview);
  } catch (err) {
    logger.error(err);
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'No id supplied for deletion' });
  }

  try {
    await db.query('DELETE FROM review WHERE id = $1', [Number(id)]);
    res.status(204).end();
  } catch (err) {
    logger.error(error);
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
