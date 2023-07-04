const prisma = require('../../../prisma/seed');

async function find_all_datas(searchNama, limit, skip) {
  return await prisma.matapelajaran.findMany({
    take: Number(limit),
    skip: skip,
    where: {
      nama: {
        contains: searchNama,
      },
    },
    include: {
      guru: {
        select: {
          user_id: true,
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
  return await prisma.matapelajaran.count({
    where: {
      nama: {
        contains: searchNama,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.matapelajaran.findUnique({
    where: {
      id,
    },
    include: {
      guru: {
        select: {
          user_id: true,
          id: true,
          nama: true,
          nip: true,
        },
        orderBy: {
          nama: 'asc',
        },
      },
    },
  });
}

async function create_data(data) {
  return await prisma.matapelajaran.create({
    data: {
      id: data.id,
      nama: data.nama,
      guru: {
        connect: data.guru?.map(function (guru) {
          return { id: guru.id };
        }),
      },
    },
    include: {
      guru: {
        select: {
          user_id: true,
          id: true,
          nip: true,
          nama: true,
        },
      },
    },
  });
}

async function update_data(id, data) {
  return await prisma.matapelajaran.update({
    where: {
      id,
    },
    data: {
      id: data.id,
      nama: data.nama,
      guru: {
        set: data.guru?.map(function (guru) {
          return { id: guru?.id };
        }),
      },
    },
    include: {
      guru: {
        select: {
          user_id: true,
          id: true,
          nip: true,
          nama: true,
        },
      },
    },
  });
}

async function delete_data(id) {
  return await prisma.matapelajaran.delete({
    where: {
      id,
    },
  });
}

async function check_matapelajaran_id(id) {
  return await prisma.matapelajaran.findUnique({
    where: {
      id,
    },
  });
}

async function check_matapelajaran_nama(nama) {
  return await prisma.matapelajaran.findUnique({
    where: {
      nama,
    },
  });
}

module.exports = {
  find_all_datas,
  count_all_datas,
  find_single_data,
  create_data,
  update_data,
  delete_data,
  check_matapelajaran_id,
  check_matapelajaran_nama,
};
