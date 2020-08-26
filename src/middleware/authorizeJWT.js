require('dotenv').config();
const jwt = require('jsonwebtoken');

const authorizeJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = authorizeJWT;
