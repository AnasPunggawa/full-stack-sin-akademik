const prisma = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { generateMatapelajaranID } = require('../utils/GenerateMatapelajaran');
const { containsOnlyString } = require('../utils/RegExp');

const errorMessage = {
  mataPelajaranNotFound: 'mata pelajaran tidak ditemukan',
  emptyNamaMataPelajaran: 'nama mata pelajaran harus diisi',
  mataPelajaranNotValid: 'nama mata pelajaran tidak valid',
};

async function createMataPelajaranValidation(request) {
  const { nama } = request.body;

  if (!nama) throw new CustomError(400, errorMessage.emptyNamaMataPelajaran);
  if (!containsOnlyString(nama))
    throw new CustomError(400, errorMessage.mataPelajaranNotValid);

  // const guruData = await prisma.matapelajaran.findUnique({});

  request.body = {
    ...request.body,
    id: generateMatapelajaranID(nama),
    nama: nama.toUpperCase(),
  };

  return request.body;
}

async function updateMataPelajaranValidation(request) {
  const { id } = request.params,
    { nama } = request.body;

  let mataPelajaranData = await prisma.matapelajaran.findUnique({
    where: {
      id,
    },
    include: {
      guru: {
        select: {
          nama: true,
        },
      },
    },
  });

  if (!mataPelajaranData)
    throw new CustomError(404, errorMessage.mataPelajaranNotFound);
  if (!nama) throw new CustomError(400, errorMessage.emptyNamaMataPelajaran);
  if (!containsOnlyString(nama))
    throw new CustomError(400, errorMessage.mataPelajaranNotValid);

  mataPelajaranData = {
    ...mataPelajaranData,
    ...request.body,
    id: generateMatapelajaranID(nama),
    nama: nama.toUpperCase(),
  };

  return mataPelajaranData;
}

module.exports = {
  createMataPelajaranValidation,
  updateMataPelajaranValidation,
};
