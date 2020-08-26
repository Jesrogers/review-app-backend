const db = require('../db');
const logger = require('../utils/logger');
const { valid } = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).send('A user with that username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await db.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, passwordHash]
    );

    const accessToken = jwt.sign(
      { id: newUser.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );

    res.json({ accessToken: accessToken });
  } catch (err) {
    logger.error(err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    const validLogin =
      !user.rows.length === 0
        ? false
        : await bcrypt.compare(password, user.rows[0].password);

    if (!validLogin) {
      return res.status(401).json('');
    }

    const accessToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );

    res.json({ accessToken: accessToken });
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { register, login };
