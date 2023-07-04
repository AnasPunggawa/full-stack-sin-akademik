const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const AccessToken = authHeader && authHeader.split(' ')[1];
  if (AccessToken == null)
    throw new CustomError(401, 'access token tidak ditemukan');
  jwt.verify(
    AccessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET,
    function (err, decoded) {
      if (err) throw new CustomError(401, 'token tidak valid');
      req.decoded = decoded;
      next();
    }
  );
}

module.exports = {
  verifyToken,
};
