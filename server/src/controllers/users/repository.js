const prisma = require('../../../prisma/seed');

// async function find_all_datas() {
//   return await prisma.users.findMany({
//     select: {
//       id: true,
//       username: true,
//       role: true,
//       password: true,
//     },
//   });
// }

async function find_all_datas(role, searchUsername, limit, skip) {
  return await prisma.users.findMany({
    take: Number(limit),
    skip: skip,
    where: {
      role: {
        contains: role,
      },
      username: {
        contains: searchUsername,
      },
    },
    include: {
      admin: true,
      guru: true,
      siswa: true,
    },
    orderBy: {
      username: 'asc',
    },
  });
}

async function count_all_datas(role, searchUsername) {
  return await prisma.users.count({
    where: {
      role: {
        contains: role,
      },
      username: {
        contains: searchUsername,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      admin: 'prisma.admin',
    },
  });
}

async function find_details_single_data_admin(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      admin: true,
    },
  });
}

async function find_details_single_data_guru(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      guru: true,
    },
  });
}

async function find_details_single_data_siswa(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      siswa: true,
    },
  });
}

async function find_datas_by_role(role) {
  return await prisma.users.findMany({
    where: {
      role,
    },
  });
}

async function create_data(data) {
  return await prisma.users.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.users.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.users.delete({
    where: {
      id,
    },
  });
}

async function find_username(username) {
  return await prisma.users.findUnique({
    where: {
      username,
    },
  });
}

async function check_user_id(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
}

async function check_username(username) {
  return await prisma.users.findUnique({
    where: {
      username,
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
  count_all_datas,
  find_single_data,
  find_details_single_data_admin,
  find_details_single_data_guru,
  find_details_single_data_siswa,
  find_datas_by_role,
  create_data,
  update_data,
  delete_data,
  find_username,
  check_user_id,
  check_username,
  check_role,
};
