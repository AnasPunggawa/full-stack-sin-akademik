const jwt = require('jsonwebtoken'),
  CustomError = require('../../utils/CustomError'),
  { generateAccessToken } = require('../../utils/GenerateAccessToken'),
  { generateRefreshToken } = require('../../utils/GenerateRefreshToken'),
  resSuccessController = require('../../utils/resSuccessController'),
  { loginUserValidation } = require('../../validation/authValidation'),
  {
    find_username,
    insert_refresh_token,
    delete_refresh_token,
    find_refresh_token,
    find_user_id,
    find_refresh_token_user_id,
  } = require('./repository');
const jwt_decode = require('jwt-decode');
require('dotenv').config();

async function authLogin(req, res, next) {
  try {
    const userLogin = await loginUserValidation(req),
      user = await find_username(userLogin.username);
    if (!user || user.password !== userLogin.password)
      throw new CustomError(401, 'username atau password salah');
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload),
      refreshToken = generateRefreshToken(payload);
    const userHasLogin = await find_refresh_token_user_id(payload.id);
    if (userHasLogin)
      throw new CustomError(403, 'akun terhubung dengan perangkat lain');
    await insert_refresh_token({
      user_id: payload.id,
      refreshToken,
    });
    res.cookie('refreshToken', refreshToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    resSuccessController(res, 200, 'login berhasil', {
      accessToken,
    });
  } catch (err) {
    next(err);
  }
}

async function authRefreshToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken == null)
      throw new CustomError(401, 'access token tidak ditemukan');
    const refreshToken = req.cookies.refreshToken;

    // Delete Refresh Token in Database
    if (!refreshToken && accessToken) {
      const decodedUserAccessToken = jwt_decode(accessToken);
      const { id: user_id } = decodedUserAccessToken;
      const foundRefreshToken = await find_refresh_token_user_id(user_id);
      if (!foundRefreshToken)
        throw new CustomError(404, 'user refresh token tidak ditemukan');
      const deleteRefreshToken = await delete_refresh_token(user_id);

      res.clearCookie('refreshToken', { httpOnly: true });
      resSuccessController(res, 403, 'refresh token dihapus', {
        deleteRefreshToken,
      });
      return;
    }
    if (!refreshToken)
      throw new CustomError(401, 'refresh token tidak ditemukan');
    const userRefreshToken = await find_refresh_token(refreshToken);
    if (!userRefreshToken)
      throw new CustomError(401, 'refresh token tidak valid');
    const user = await find_user_id(userRefreshToken.user_id);

    // Create New Access Token
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      function (err, decoded) {
        if (err) throw new CustomError(401, 'refresh token tidak valid');
        const accessToken = generateAccessToken(user);
        resSuccessController(res, 200, 'akses token berhasil dibuat', {
          accessToken,
        });
      }
    );
  } catch (error) {
    next(error);
  }
}

async function authLogout(req, res, next) {
  try {
    const { id, username } = req.decoded,
      user_id = id;
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      throw new CustomError(401, 'refresh token tidak ditemukan');
    const UserLogout = await delete_refresh_token(user_id);
    if (!UserLogout) throw new CustomError(401, 'refresh token tidak valid');
    res.clearCookie('refreshToken', { httpOnly: true });
    resSuccessController(res, 200, 'logout berhasil', username);
    return;
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authLogin,
  authRefreshToken,
  authLogout,
};
