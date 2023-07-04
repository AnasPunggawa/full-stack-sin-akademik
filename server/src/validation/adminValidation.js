const prisma = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { validateEmail, containsOnlyNumbers } = require('../utils/RegExp');

const errorMessage = {
  userNotFound: 'user admin tidak ditemukan',
  emptyNama: 'nama harus diisi',
  shortNama: 'nama minimal terdiri dari 3 karakter',
  emptyUserId: 'user_id harus diisi',
  emptyJenisKelamin: 'jenis kelamin harus diisi',
  emptyTempatLahir: 'tempat lahir harus diisi',
  emptyTanggalLahir: 'tanggal lahir harus diisi',
  emptyAlamat: 'alamat harus diisi',
  emptyEmail: 'email harus diisi',
  emailNotValid: 'email tidak valid',
  emptyNomorHP: 'nomor HP harus diisi',
  nomorHPNotValid: 'nomor HP tidak valid',
};

function createAdminValidation(request) {
  const {
    nama,
    user_id,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    alamat,
    email,
    nomorHP,
  } = request.body;

  if (!nama) throw new CustomError(400, errorMessage.emptyNama);
  if (nama.length < 3) throw new CustomError(400, errorMessage.shortNama);
  if (!user_id) throw new CustomError(400, errorMessage.emptyUserId);
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

  return request.body;
}

async function updateAdminValidation(request) {
  const { id } = request.params,
    {
      nama,
      user_id,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      alamat,
      email,
      nomorHP,
    } = request.body;

  let adminData = await prisma.admin.findUnique({
    where: { id },
  });

  if (!adminData) throw new CustomError(404, errorMessage.userNotFound);
  if (!nama) throw new CustomError(400, errorMessage.emptyNama);
  if (nama.length < 3) throw new CustomError(400, errorMessage.shortNama);
  if (!user_id) throw new CustomError(400, errorMessage.emptyUserId);
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

  adminData = {
    ...adminData,
    nama,
    user_id,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    alamat,
    email,
    nomorHP,
  };

  return adminData;
}

module.exports = {
  createAdminValidation,
  updateAdminValidation,
};
