const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
    // expiresIn: '15s',
  });
}

module.exports = {
  generateRefreshToken,
};
