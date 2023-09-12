// const prisma = require('../../prisma/seed');
const { prisma } = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const {
  generateKelasID,
  generateKodeKelas,
} = require('../utils/GenerateKelas');
const { containsOnlyNumbers } = require('../utils/RegExp');

const errorMessage = {
  kelasNotFound: 'kelas tidak ditemukan',
  emptyKelas: 'kelas harus diisi',
  kelasNotValid: 'kelas tidak valid',
  emptyKode: 'kode harus diisi',
  KodeNotValid: 'kode tidak valid',
};

function createKelasValidation(request) {
  const { kelas, kode } = request.body;

  if (!kelas) throw new CustomError(400, errorMessage.emptyKelas);
  if (kelas.length !== 1 || !containsOnlyNumbers(kelas))
    throw new CustomError(400, errorMessage.kelasNotValid);
  if (!kode) throw new CustomError(400, errorMessage.emptyKode);
  if (kode.length > 4 || containsOnlyNumbers(kode))
    throw new CustomError(400, errorMessage.KodeNotValid);

  request.body = {
    ...request.body,
    id: generateKelasID(kelas, kode),
    kodeKelas: generateKodeKelas(kelas, kode),
    kelas,
    kode: kode.toUpperCase(),
  };

  return request.body;
}

async function updateKelasValidation(request) {
  const { id } = request.params,
    { kelas, kode } = request.body;

  let kelasData = await prisma.kelas.findUnique({
    where: {
      id,
    },
  });

  if (!kelasData) throw new CustomError(404, errorMessage.kelasNotFound);
  if (!kelas) throw new CustomError(400, errorMessage.emptyKelas);
  if (kelas.length !== 1 || !containsOnlyNumbers(kelas))
    throw new CustomError(400, errorMessage.kelasNotValid);
  if (!kode) throw new CustomError(400, errorMessage.emptyKode);
  if (kode.length > 4 || containsOnlyNumbers(kode))
    throw new CustomError(400, errorMessage.KodeNotValid);

  kelasData = {
    ...kelasData,
    id: generateKelasID(kelas, kode),
    kodeKelas: generateKodeKelas(kelas, kode),
    kelas,
    kode: kode.toUpperCase(),
  };

  return kelasData;
}

module.exports = {
  createKelasValidation,
  updateKelasValidation,
};
