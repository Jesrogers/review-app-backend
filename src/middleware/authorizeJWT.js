require('dotenv').config();
const jwt = require('jsonwebtoken');

const authorizeJWT = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next({ status: 401, message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;

    if (req.params.id !== req.user.id) {
      return next({ status: 403, message: 'Forbidden' });
    }

    next();
  } catch (err) {
    res.clearCookie('token');
    return next({ status: 401, message: 'Unauthorized' });
  }
};

module.exports = authorizeJWT;
