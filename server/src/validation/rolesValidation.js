// const prisma = require('../../prisma/seed');
const { prisma } = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');

const errorMessage = {
  roleNotFound: 'role tidak ditemukan',
  emptyRole: 'role harus diisi',
};

function createRoleValidation(request) {
  const { role } = request.body;

  if (!role) throw new CustomError(400, errorMessage.emptyRole);

  request.body = {
    id: role.toLowerCase(),
    role: role.toLowerCase(),
  };

  return request.body;
}

async function updateRoleValidation(request) {
  const { id } = request.params,
    { role } = request.body;

  let roleData = await prisma.roles.findUnique({
    where: {
      id,
    },
  });

  if (!roleData) throw new CustomError(404, errorMessage.roleNotFound);
  if (!role) throw new CustomError(400, errorMessage.emptyRole);

  roleData = {
    ...roleData,
    id: role.toLowerCase(),
    role: role.toLowerCase(),
  };

  return roleData;
}

module.exports = {
  createRoleValidation,
  updateRoleValidation,
};
