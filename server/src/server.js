// CLEAR CONSOLE
console.clear();

// IMPORT PACKAGES
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const CustomError = require('./utils/CustomError');
const errorHandler = require('./middlewares/errorHandler.middlewares');
const { connectDB, prisma } = require('../prisma/seed');
const {
  jobDeleteExpiredRefreshTokens,
} = require('./utils/DeleteExpiredRefreshTokens');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// CONNECT TO DATABASE
connectDB();

async function main() {
  // MIDDLEWARES
  app.use(
    cors({
      origin: [
        process.env.CLIENT_ORIGIN_DEV,
        process.env.CLIENT_ORIGIN_PROD,
        process.env.CLIENT_ORIGIN_VERCEL,
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Headers',
      ],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // DELETE EXPIRES REFRESH TOKEN
  jobDeleteExpiredRefreshTokens.start();

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
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// MIDDLEWARES
// app.use(
//   cors({
//     origin: [
//       process.env.CLIENT_ORIGIN_DEV,
//       process.env.CLIENT_ORIGIN_PROD,
//       process.env.CLIENT_ORIGIN_VERCEL,
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: [
//       'Content-Type',
//       'Authorization',
//       'Access-Control-Allow-Origin',
//       'Access-Control-Allow-Methods',
//       'Access-Control-Allow-Headers',
//     ],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // ROUTES
// app.use('/api/v1', routes);

// // ROUTES ERROR
// app.all('*', function (req, res, next) {
//   const err = new CustomError(404, 'Page not found!');
//   next(err);
//   return;
// });

// // ERROR HANDLING MIDDLEWARE
// app.use(errorHandler);

// // LISTENER
// app.listen(PORT, function () {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
