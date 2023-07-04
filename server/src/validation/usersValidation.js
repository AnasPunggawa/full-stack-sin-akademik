const prisma = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { containsWhitespace } = require('../utils/RegExp');

const errorMessage = {
  userNotFound: 'user tidak ditemukan',
  emptyUsername: 'username harus diisi',
  whitespaceUsername: 'username tidak boleh mengandung spasi',
  shortUsername: 'username minimal terdiri dari 5 karakter',
  emptyPassword: 'password harus diisi',
  shortPassword: 'password minimal terdiri dari 8 karakter',
  emptyRole: 'role harus diisi',
};

function createUserValidation(request) {
  const { username, password, role } = request.body;

  if (!username) throw new CustomError(400, errorMessage.emptyUsername);
  if (containsWhitespace(username))
    throw new CustomError(400, errorMessage.whitespaceUsername);
  if (username.length < 5)
    throw new CustomError(400, errorMessage.shortUsername);
  if (!password) throw new CustomError(400, errorMessage.emptyPassword);
  if (password.length < 8)
    throw new CustomError(400, errorMessage.shortPassword);
  if (!role) throw new CustomError(400, errorMessage.emptyRole);

  return request.body;
}

async function updateUserValidation(request) {
  const { id } = request.params,
    { username, password, role } = request.body;
  let userData = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!userData) throw new CustomError(404, errorMessage.userNotFound);
  if (!username) throw new CustomError(400, errorMessage.emptyUsername);
  if (containsWhitespace(username))
    throw new CustomError(400, errorMessage.whitespaceUsername);
  if (username.length < 5)
    throw new CustomError(400, errorMessage.shortUsername);
  if (!password) throw new CustomError(400, errorMessage.emptyPassword);
  if (password.length < 8)
    throw new CustomError(400, errorMessage.shortPassword);
  if (!role) throw new CustomError(400, errorMessage.emptyRole);

  userData = {
    ...userData,
    username,
    password,
    role: role.toLowerCase(),
    updatedAt: new Date(),
  };

  return userData;
}

module.exports = {
  createUserValidation,
  updateUserValidation,
};
