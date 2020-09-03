const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 10 * 1000,
  max: 5,
  handler: (req, res, next) => {
    next({ status: 429, message: 'Please wait before trying again' });
  },
});

module.exports = rateLimiter;
