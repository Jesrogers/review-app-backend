const db = require('../db');
const logger = require('../utils/logger');
const { reviewValidation } = require('../validation');

const getReviews = async (req, res) => {
  const { id } = req.user;

  try {
    const reviews = await db.query(
      'SELECT * FROM review WHERE created_by = $1',
      [id]
    );
    res.status(200).json(reviews.rows);
  } catch (e) {
    logger.error(e);
  }
};

const getReview = async (req, res, next) => {
  const { id } = req.user;
  const reviewId = req.params.id;

  try {
    const review = await db.query(
      'SELECT * FROM review WHERE id = $1 AND created_by = $2',
      [reviewId, id]
    );

    if (review.rows.length) {
      res.status(200).json(review.rows[0]);
    } else {
      next({ status: 404, message: 'no review found' });
    }
  } catch (err) {
    logger.error(err);
  }
};

const createReview = async (req, res) => {
  const { error } = reviewValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { title, description, rating } = req.body;
  const { id } = req.user;

  try {
    const savedReview = await db.query(
      'INSERT INTO review (title, description, rating, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, rating, id]
    );

    const newReview = {
      id: savedReview.rows[0].id,
      title: savedReview.rows[0].title,
      description: savedReview.rows[0].description,
      rating: savedReview.rows[0].rating,
      created_by: savedReview.rows[0].created_by,
    };

    res.status(201).json(newReview);
  } catch (err) {
    logger.error(err);
  }
};

const updateReview = async (req, res, next) => {
  const { error } = reviewValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { title, description, rating } = req.body;
  const reviewId = Number(req.params.id);
  const { id: userId } = req.user;

  try {
    const updatedReview = await db.query(
      'UPDATE review SET title = $1, description = $2, rating = $3 WHERE id = $4 AND created_by = $5 RETURNING title, description, rating, id',
      [title, description, rating, reviewId, userId]
    );

    if (!updatedReview.rows[0]) {
      next({ status: 404, message: 'No review found for this user' });
    }

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
    return res.status(400).send('No id supplied for deletion');
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
