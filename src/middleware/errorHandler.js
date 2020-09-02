const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  }

  res.status(status).json(message);
};

module.exports = errorHandler;
