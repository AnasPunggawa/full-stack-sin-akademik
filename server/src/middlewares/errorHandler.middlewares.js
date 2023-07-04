function errorHandler(err, req, res, next) {
  console.log('Middleware Error Handling');
  const errStatusCode = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  res.status(errStatusCode).json({
    success: false,
    status: errStatusCode,
    message: errMsg,
  });
  next();
}

module.exports = errorHandler;
