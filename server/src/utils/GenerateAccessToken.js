const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
    // expiresIn: '10s',
  });
}

module.exports = {
  generateAccessToken,
};
