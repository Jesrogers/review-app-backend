const jwt = require('jsonwebtoken');

const authorizeJWT = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    return next({ status: 401, message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;

    next();
  } catch (err) {
    res.clearCookie('token');
    return next({ status: 401, message: 'Unauthorized' });
  }
};

module.exports = authorizeJWT;
