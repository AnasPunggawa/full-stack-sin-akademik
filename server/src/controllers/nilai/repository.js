const prisma = require('../../../prisma/seed');

async function find_all_datas(
  searchNama,
  siswaID,
  kodeSemester,
  kodeKelas,
  kodeMataPelajaran,
  limit,
  skip
) {
  return await prisma.nilai.findMany({
    take: Number(limit),
    skip: skip,
    where: {
      siswa: {
        nama: {
          contains: searchNama,
        },
      },
      siswa_id: {
        contains: siswaID,
      },
      semester_id: {
        contains: kodeSemester,
      },
      kelas_id: {
        contains: kodeKelas,
      },
      matapelajaran_id: {
        contains: kodeMataPelajaran,
      },
    },
    include: {
      siswa: {
        select: {
          id: true,
          user_id: true,
          nisn: true,
          nis: true,
          nama: true,
          status: true,
        },
      },
      semester: {
        select: {
          id: true,
          kodeSemester: true,
          status: true,
        },
      },
      kelas: {
        select: {
          id: true,
          kodeKelas: true,
          kelas: true,
          kode: true,
        },
      },
      matapelajaran: {
        select: {
          id: true,
          nama: true,
        },
      },
      guru: {
        select: {
          id: true,
          user_id: true,
          nip: true,
          nama: true,
          status: true,
        },
      },
    },
    orderBy: {
      id: 'asc',
    },
  });
}

async function count_all_datas(
  searchNama,
  kodeSemester,
  kodeKelas,
  kodeMataPelajaran
) {
  return await prisma.nilai.count({
    where: {
      siswa: {
        nama: {
          contains: searchNama,
        },
      },
      semester_id: {
        contains: kodeSemester,
      },
      kelas_id: {
        contains: kodeKelas,
      },
      matapelajaran_id: {
        contains: kodeMataPelajaran,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.nilai.findUnique({
    where: {
      id,
    },
    include: {
      siswa: {
        select: {
          id: true,
          user_id: true,
          nisn: true,
          nama: true,
          status: true,
        },
      },
      semester: {
        select: {
          id: true,
          kodeSemester: true,
          status: true,
        },
      },
      kelas: {
        select: {
          id: true,
          kodeKelas: true,
          kelas: true,
          kode: true,
        },
      },
      matapelajaran: {
        select: {
          id: true,
          nama: true,
        },
      },
      guru: {
        select: {
          id: true,
          user_id: true,
          nip: true,
          nama: true,
          status: true,
        },
      },
    },
  });
}

async function create_data(data) {
  return await prisma.nilai.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.nilai.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.nilai.delete({
    where: {
      id,
    },
  });
}

async function check_nilai_id(id) {
  return await prisma.nilai.findUnique({
    where: {
      id,
    },
  });
}

async function check_siswa_id(siswa_id) {
  return await prisma.siswa.findUnique({
    where: {
      id: siswa_id,
    },
  });
}

async function check_semester_id(semester_id) {
  return await prisma.semester.findUnique({
    where: {
      id: semester_id,
    },
  });
}

async function check_kelas_id(kelas_id) {
  return await prisma.kelas.findUnique({
    where: {
      id: kelas_id,
    },
  });
}

async function check_matapelajaran_id(matapelajaran_id) {
  return await prisma.matapelajaran.findUnique({
    where: {
      id: matapelajaran_id,
    },
  });
}

async function check_guru_id(guru_id) {
  return await prisma.guru.findUnique({
    where: {
      id: guru_id,
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
  check_nilai_id,
  check_siswa_id,
  check_semester_id,
  check_kelas_id,
  check_matapelajaran_id,
  check_guru_id,
};
