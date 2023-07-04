const CustomError = require('../utils/CustomError');

const errorMessage = {
  emptyUsername: 'username harus diisi',
  emptyPassword: 'password harus diisi',
};

function loginUserValidation(request) {
  const { username, password } = request.body;
  if (!username) throw new CustomError(400, errorMessage.emptyUsername);
  if (!password) throw new CustomError(400, errorMessage.emptyPassword);

  return request.body;
}

module.exports = {
  loginUserValidation,
};
