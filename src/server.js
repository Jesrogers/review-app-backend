require('dotenv').config();
const express = require('express');
const reviewsRouter = require('./routes/reviews');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

app.use('/api/reviews', reviewsRouter);

app.use(middleware.unknownEndpoint);

const PORT = process.env.port || 3001;
app.listen(
  PORT,
  logger.info(`Review app listening at http://localhost:${PORT}`)
);
