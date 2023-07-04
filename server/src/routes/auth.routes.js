const {
  authLogin,
  authLogout,
  authRefreshToken,
} = require('../controllers/auth/auth.controllers');
const { verifyToken } = require('../middlewares/verifyToken.middlewares');

const authRoutes = require('express').Router();

// PUBLIC API
authRoutes.post('/login', authLogin);
authRoutes.get('/refresh-token', authRefreshToken);

// PRIVATE API
authRoutes.delete('/logout', verifyToken, authLogout);

module.exports = authRoutes;
