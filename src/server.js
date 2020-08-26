require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const reviewsRouter = require('./routes/reviews');
const unknownEndpoint = require('./middleware/unknownEndpoint');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);

app.use(unknownEndpoint);

const PORT = process.env.port || 3001;
app.listen(
  PORT,
  logger.info(`Review app listening at http://localhost:${PORT}`)
);
