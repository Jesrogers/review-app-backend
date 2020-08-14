const express = require('express');
const reviewsRouter = require('./routes/reviews');

const app = express();

app.use('/api/reviews', reviewsRouter);

const PORT = process.env.port || 3001;
app.listen(
  PORT,
  console.log(`Review app listening at http://localhost:${PORT}`)
);
