// const prisma = require('../../prisma/seed');
const { prisma } = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { generateGuruID, generateStatusGuru } = require('../utils/GenerateGuru');
const { containsOnlyNumbers, validateEmail } = require('../utils/RegExp');

const errorMessage = {
  userNotFound: 'user guru tidak ditemukan',
  emptyUserId: 'user_id harus diisi',
  emptyNama: 'nama harus diisi',
  shortNama: 'nama minimal terdiri dari 3 karakter',
  emptyNip: 'nip harus diisi',
  nipNotNumber: 'nip harus berupa angka',
  emptyJenisKelamin: 'jenis kelamin harus diisi',
  emptyTempatLahir: 'tempat lahir harus diisi',
  emptyTanggalLahir: 'tanggal lahir harus diisi',
  emptyAlamat: 'alamat harus diisi',
  emptyEmail: 'email harus diisi',
  emailNotValid: 'email tidak valid',
  emptyNomorHP: 'nomor HP harus diisi',
  nomorHPNotValid: 'nomor HP tidak valid',
};

function createGuruValidation(request) {
  const {
    user_id,
    nama,
    nip,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    alamat,
    email,
    nomorHP,
    status,
  } = request.body;

  if (!user_id) throw new CustomError(400, errorMessage.emptyUserId);
  if (!nama) throw new CustomError(400, errorMessage.emptyNama);
  if (nama.length < 3) throw new CustomError(400, errorMessage.shortNama);
  if (!nip) throw new CustomError(400, errorMessage.emptyNip);
  if (!containsOnlyNumbers(nip))
    throw new CustomError(400, errorMessage.nipNotNumber);
  if (!jenisKelamin) throw new CustomError(400, errorMessage.emptyJenisKelamin);
  if (!tempatLahir) throw new CustomError(400, errorMessage.emptyTempatLahir);
  if (!tanggalLahir) throw new CustomError(400, errorMessage.emptyTanggalLahir);
  if (!alamat) throw new CustomError(400, errorMessage.emptyAlamat);
  if (!email) throw new CustomError(400, errorMessage.emptyEmail);
  if (!validateEmail(email))
    throw new CustomError(400, errorMessage.emailNotValid);
  if (!nomorHP) throw new CustomError(400, errorMessage.emptyNomorHP);
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, errorMessage.nomorHPNotValid);

  request.body = {
    ...request.body,
    id: generateGuruID(nip, nama),
    status: generateStatusGuru(status),
  };

  return request.body;
}

async function updateGuruValidation(request) {
  const { id } = request.params,
    {
      user_id,
      nama,
      nip,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      email,
      nomorHP,
      status,
    } = request.body;

  let guruData = await prisma.guru.findUnique({
    where: {
      id,
    },
  });

  if (!guruData) throw new CustomError(404, errorMessage.userNotFound);
  if (!user_id) throw new CustomError(400, errorMessage.emptyUserId);
  if (!nama) throw new CustomError(400, errorMessage.emptyNama);
  if (nama.length < 3) throw new CustomError(400, errorMessage.shortNama);
  if (!nip) throw new CustomError(400, errorMessage.emptyNip);
  if (!containsOnlyNumbers(nip))
    throw new CustomError(400, errorMessage.nipNotNumber);
  if (!jenisKelamin) throw new CustomError(400, errorMessage.emptyJenisKelamin);
  if (!tempatLahir) throw new CustomError(400, errorMessage.emptyTempatLahir);
  if (!tanggalLahir) throw new CustomError(400, errorMessage.emptyTanggalLahir);
  if (!alamat) throw new CustomError(400, errorMessage.emptyAlamat);
  if (!email) throw new CustomError(400, errorMessage.emptyEmail);
  if (!validateEmail(email))
    throw new CustomError(400, errorMessage.emailNotValid);
  if (!nomorHP) throw new CustomError(400, errorMessage.emptyNomorHP);
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, errorMessage.nomorHPNotValid);

  guruData = {
    ...guruData,
    id: generateGuruID(nip, nama),
    user_id,
    nama,
    nip,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    alamat,
    email,
    nomorHP,
    status: generateStatusGuru(status),
  };

  return guruData;
}

module.exports = {
  createGuruValidation,
  updateGuruValidation,
};
