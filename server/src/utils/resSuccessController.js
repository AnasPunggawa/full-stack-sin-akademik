module.exports = function resSuccessController(
  res,
  statusCode = 200,
  message = 'Berhasil',
  data = null
) {
  res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
  });
};
