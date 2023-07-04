const prisma = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const {
  validateTahunAjaran,
  generateSemesterID,
  generateKodeSemester,
  generateStatusSemester,
} = require('../utils/GenerateSemester');
const { validateGanjilGenap } = require('../utils/RegExp');

const errorMessage = {
  semesterNotFound: 'semester tidak ditemukan',
  emptyTahunAjaran: 'tahun ajaran harus diisi',
  tahunAjaranNotValid: 'tahun ajaran tidak valid',
  emptySemester: 'semester harus diisi',
  semesterNotValid: 'semester tidak valid',
};

function createSemesterValidation(request) {
  const { tahunAjaran, semester, status } = request.body;

  if (!tahunAjaran) throw new CustomError(400, errorMessage.emptyTahunAjaran);
  if (!validateTahunAjaran(tahunAjaran))
    throw new CustomError(400, errorMessage.tahunAjaranNotValid);
  if (!semester) throw new CustomError(400, errorMessage.emptySemester);
  if (!validateGanjilGenap(semester))
    throw new CustomError(400, errorMessage.semesterNotValid);

  request.body = {
    ...request.body,
    id: generateSemesterID(tahunAjaran, semester),
    kodeSemester: generateKodeSemester(tahunAjaran, semester),
    tahunAjaran: tahunAjaran,
    semester: semester.toLowerCase(),
    status: generateStatusSemester(status),
  };

  return request.body;
}

async function updateSemesterValidation(request) {
  const { id } = request.params,
    { tahunAjaran, semester, status } = request.body;

  let semesterData = await prisma.semester.findUnique({
    where: {
      id,
    },
  });

  if (!semesterData) throw new CustomError(404, errorMessage.semesterNotFound);
  if (!tahunAjaran) throw new CustomError(400, errorMessage.emptyTahunAjaran);
  if (!validateTahunAjaran(tahunAjaran))
    throw new CustomError(400, errorMessage.tahunAjaranNotValid);
  if (!semester) throw new CustomError(400, errorMessage.emptySemester);
  if (!validateGanjilGenap(semester))
    throw new CustomError(400, errorMessage.semesterNotValid);

  semesterData = {
    ...semesterData,
    id: generateSemesterID(tahunAjaran, semester),
    kodeSemester: generateKodeSemester(tahunAjaran, semester),
    tahunAjaran: tahunAjaran,
    semester: semester.toLowerCase(),
    status: generateStatusSemester(status),
  };

  return semesterData;
}

module.exports = {
  createSemesterValidation,
  updateSemesterValidation,
};
