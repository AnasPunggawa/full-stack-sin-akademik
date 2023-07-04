const prisma = require('../../../prisma/seed');

async function find_all_datas(tingkat, searchKelas, limit, skip) {
  return await prisma.kelas.findMany({
    take: Number(limit),
    skip: skip,
    where: {
      kelas: {
        contains: tingkat,
      },
      kodeKelas: {
        contains: searchKelas,
      },
    },
    orderBy: {
      kodeKelas: 'asc',
    },
  });
}

async function count_all_data(tingkat, searchKelas) {
  return await prisma.kelas.count({
    where: {
      kelas: {
        contains: tingkat,
      },
      kodeKelas: {
        contains: searchKelas,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.kelas.findUnique({
    where: {
      id,
    },
  });
}

async function create_data(data) {
  return await prisma.kelas.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.kelas.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.kelas.delete({
    where: {
      id,
    },
  });
}

async function check_kelas_id(id) {
  return await prisma.kelas.findUnique({
    where: {
      id,
    },
  });
}

async function check_kode_kelas(kodeKelas) {
  return await prisma.kelas.findUnique({
    where: {
      kodeKelas,
    },
  });
}

module.exports = {
  find_all_datas,
  count_all_data,
  find_single_data,
  create_data,
  update_data,
  delete_data,
  check_kelas_id,
  check_kode_kelas,
};
