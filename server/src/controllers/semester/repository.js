const prisma = require('../../../prisma/seed');

async function find_all_datas(tingkat, searchSemester, limit, skip) {
  return await prisma.semester.findMany({
    take: Number(limit),
    skip: skip,
    where: {
      semester: {
        contains: tingkat,
      },
      kodeSemester: {
        contains: searchSemester,
      },
    },
    orderBy: {
      kodeSemester: 'asc',
    },
  });
}

async function count_all_datas(tingkat, searchSemester) {
  return await prisma.semester.count({
    where: {
      semester: {
        contains: tingkat,
      },
      kodeSemester: {
        contains: searchSemester,
      },
    },
  });
}

async function find_single_data(id) {
  return await prisma.semester.findUnique({
    where: {
      id,
    },
  });
}

async function find_details_single_data(id) {
  return await prisma.semester.findUnique({
    where: {
      id,
    },
    include: {
      kelas: true,
    },
  });
}

async function create_data(data) {
  return await prisma.semester.create({
    data,
  });
}

async function update_data(id, data) {
  return await prisma.semester.update({
    where: {
      id,
    },
    data,
  });
}

async function delete_data(id) {
  return await prisma.semester.delete({
    where: {
      id,
    },
  });
}

async function check_semester_id(id) {
  return await prisma.semester.findUnique({
    where: {
      id,
    },
  });
}

async function check_kode_semester(kodeSemester) {
  return await prisma.semester.findUnique({
    where: {
      kodeSemester,
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
  check_semester_id,
  check_kode_semester,
};
