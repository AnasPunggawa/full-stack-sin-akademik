// const prisma = require('../../../prisma/seed');

const { prisma } = require('../../../prisma/seed');

async function find_all_datas(searchNama, limit, skip) {
  return await prisma.siswa.findMany({
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
    },
    orderBy: {
      nama: 'asc',
    },
  });
}

async function count_all_datas(searchNama) {
  return await prisma.siswa.count({
    where: {
      nama: {
        contains: searchNama,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.siswa.findUnique({
    where: {
      id,
    },
  });
}

async function find_details_single_data(id) {
  return await prisma.siswa.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
      semester: true,
    },
  });
}

async function create_data(data) {
  return await prisma.siswa.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.siswa.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.siswa.delete({
    where: {
      id,
    },
  });
}

async function check_siswa_id(id) {
  return await prisma.siswa.findUnique({
    where: {
      id,
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

async function check_siswa_has_user_id(user_id) {
  return await prisma.siswa.findUnique({
    where: {
      user_id,
    },
  });
}

async function check_nisn(nisn) {
  return await prisma.siswa.findUnique({
    where: {
      nisn,
    },
  });
}

async function check_nis(nis) {
  return await prisma.siswa.findUnique({
    where: {
      nis,
    },
  });
}

async function check_email(email) {
  return await prisma.siswa.findUnique({
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
  check_siswa_id,
  check_user_id,
  check_siswa_has_user_id,
  check_nisn,
  check_nis,
  check_email,
};
