require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const reviewsRouter = require('./routes/reviews');
const unknownEndpoint = require('./middleware/unknownEndpoint');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(
  PORT,
  logger.info(`Review app listening at http://localhost:${PORT}`)
);
