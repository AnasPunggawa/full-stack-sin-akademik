const prisma = require('../../../prisma/seed');

async function check_user_id(id) {
  return await prisma.users.findUnique({
    where: {
      id,
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
      guru: {
        include: {
          matapelajaran: true,
        },
      },
    },
  });
}

async function find_details_single_data_siswa(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
    include: {
      siswa: {
        include: {
          semester: true,
          nilai: true,
        },
      },
    },
  });
}

async function count_all_guru_aktif() {
  return await prisma.guru.count({
    where: {
      status: true,
    },
    // where: {
    //   status: {
    //     contains: true,
    //   },
    // },
  });
}

async function count_all_siswa_aktif() {
  return await prisma.siswa.count({
    where: {
      status: true,
    },
    // where: {
    //   status: {
    //     contains: true,
    //   },
    // },
  });
}

async function count_all_kelas() {
  return await prisma.kelas.count();
}

async function count_all_matapelajaran() {
  return await prisma.matapelajaran.count();
}

module.exports = {
  check_user_id,
  find_single_data,
  find_details_single_data_admin,
  find_details_single_data_guru,
  find_details_single_data_siswa,
  count_all_guru_aktif,
  count_all_siswa_aktif,
  count_all_kelas,
  count_all_matapelajaran,
};
