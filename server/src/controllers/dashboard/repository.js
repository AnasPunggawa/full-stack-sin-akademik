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
  });
}

async function count_all_siswa_aktif() {
  return await prisma.siswa.count({
    where: {
      status: true,
    },
  });
}

async function count_all_kelas() {
  return await prisma.kelas.count();
}

async function count_all_matapelajaran() {
  return await prisma.matapelajaran.count();
}

async function find_profil_sekolah(npsn) {
  return await prisma.profil_sekolah.findUnique({
    where: {
      id: npsn,
    },
  });
}

async function find_identitas_sekolah(npsn) {
  return await prisma.identitas_sekolah.findUnique({
    where: {
      id: npsn,
    },
  });
}

async function find_kontak_sekolah(npsn) {
  return await prisma.kontak_sekolah.findUnique({
    where: {
      id: npsn,
    },
  });
}

async function create_data_profil_sekolah(data) {
  return await prisma.profil_sekolah.create({
    data,
  });
}

async function update_data_profil_sekolah(id, data) {
  return await prisma.profil_sekolah.update({
    where: {
      id,
    },
    data,
  });
}

async function create_data_identitas_sekolah(data) {
  return await prisma.identitas_sekolah.create({
    data,
  });
}

async function update_data_identitas_sekolah(id, data) {
  return await prisma.identitas_sekolah.update({
    where: {
      id,
    },
    data,
  });
}

async function create_data_kontak_sekolah(data) {
  return await prisma.kontak_sekolah.create({
    data,
  });
}

async function update_data_kontak_sekolah(id, data) {
  return await prisma.kontak_sekolah.update({
    where: {
      id,
    },
    data,
  });
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
  find_profil_sekolah,
  find_identitas_sekolah,
  find_kontak_sekolah,
  create_data_profil_sekolah,
  update_data_profil_sekolah,
  create_data_identitas_sekolah,
  update_data_identitas_sekolah,
  create_data_kontak_sekolah,
  update_data_kontak_sekolah,
};
