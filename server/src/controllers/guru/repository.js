// const prisma = require('../../../prisma/seed');
const { prisma } = require('../../../prisma/seed');

async function find_all_datas(searchNama, limit, skip) {
  return await prisma.guru.findMany({
    take: Number(limit),
    skip: skip,
    where: {
      nama: {
        contains: searchNama,
      },
    },
    include: {
      users: {
        select: {
          username: true,
          role: true,
        },
      },
      matapelajaran: {
        select: {
          id: true,
          nama: true,
        },
        orderBy: {
          nama: 'asc',
        },
      },
    },
    orderBy: {
      nama: 'asc',
    },
  });
}

async function count_all_datas(searchNama) {
  return await prisma.guru.count({
    where: {
      nama: {
        contains: searchNama,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.guru.findUnique({
    where: {
      id,
    },
  });
}

async function find_details_single_data(id) {
  return await prisma.guru.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
      matapelajaran: true,
    },
  });
}

async function create_data(data) {
  return await prisma.guru.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.guru.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.guru.delete({
    where: {
      id,
    },
  });
}

async function check_guru_id(id) {
  return await prisma.guru.findUnique({
    where: {
      id,
    },
  });
}

async function check_user_id(user_id) {
  return await prisma.users.findUnique({
    where: {
      id: user_id,
    },
  });
}

async function check_guru_has_user_id(user_id) {
  return await prisma.guru.findUnique({
    where: {
      user_id: user_id,
    },
  });
}

async function check_nip(nip) {
  return await prisma.guru.findUnique({
    where: {
      nip,
    },
  });
}

async function check_email(email) {
  return await prisma.guru.findUnique({
    where: {
      email,
    },
  });
}

module.exports = {
  find_all_datas,
  count_all_datas,
  find_single_data,
  find_details_single_data,
  create_data,
  update_data,
  delete_data,
  check_guru_id,
  check_user_id,
  check_guru_has_user_id,
  check_nip,
  check_email,
};
