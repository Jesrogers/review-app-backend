const db = require('../db');
const { registerValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { error } = registerValidation(req.body);

  if (error) {
    return next(error);
  }

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
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, passwordHash]
    );

    const accessToken = jwt.sign(
      { id: newUser.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );

    res.json({ accessToken: accessToken });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (user.rows.length === 0) {
      return next({
        status: 401,
        message: 'Invalid username or password',
      });
    }

    const validLogin =
      user.rows.length === 0
        ? false
        : await bcrypt.compare(password, user.rows[0].password);

    if (!validLogin) {
      return next({
        status: 401,
        message: 'Invalid username or password',
      });
    }

    const accessToken = jwt.sign(
      { id: user.rows[0].id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1hr' }
    );
    res.cookie('token', accessToken, { httpOnly: true, signed: true });
    res.json({ message: 'Logged in' });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  } catch (err) {
    next(err);
  }
};

const isVerified = (req, res, next) => {
  try {
    res.json(true);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, logout, isVerified };
