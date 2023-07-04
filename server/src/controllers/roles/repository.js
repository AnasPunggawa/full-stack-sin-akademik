const prisma = require('../../../prisma/seed');

async function find_all_datas() {
  return await prisma.roles.findMany({
    include: {
      _count: {
        select: {
          users: true,
        },
      },
      users: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.roles.findUnique({
    where: {
      id: id.toLowerCase(),
    },
    // include: {
    //   users: {
    //     select: {
    //       username: true,
    //       password: true,
    //     },
    //   },
    // },
  });
}

async function create_data(data) {
  return await prisma.roles.create({
    data,
  });
}

async function udpate_data(id, data) {
  return await prisma.roles.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.roles.delete({
    where: {
      id: id.toLowerCase(),
    },
  });
}

async function check_role(role) {
  return await prisma.roles.findUnique({
    where: {
      id: role.toLowerCase(),
    },
  });
}

module.exports = {
  find_all_datas,
  find_single_data,
  create_data,
  udpate_data,
  delete_data,
  check_role,
};
