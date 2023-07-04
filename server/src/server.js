// CLEAR CONSOLE
console.clear();

// IMPORT PACKAGES
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const CustomError = require('./utils/CustomError');
const errorHandler = require('./middlewares/errorHandler.middlewares');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/v1', routes);

// ROUTES ERROR
app.all('*', function (req, res, next) {
  const err = new CustomError(404, 'Page not found!');
  next(err);
  return;
});

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// LISTENER
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});
