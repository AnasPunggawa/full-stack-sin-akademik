// const prisma = require('../../prisma/seed');
const { prisma } = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const {
  generateSiswaID,
  generateStatusSiswa,
} = require('../utils/GenerateSiswa');
const { containsOnlyNumbers, validateEmail } = require('../utils/RegExp');

const errorMessage = {
  userNotFound: 'user siswa tidak ditemukan',
  emptyUserId: 'user_id harus diisi',
  emptyNama: 'nama harus diisi',
  shortNama: 'nama minimal terdiri dari 3 karakter',
  emptyNisn: 'nisn harus diisi',
  nisnNotNumber: 'nisn harus berupa angka',
  emptyNis: 'nis harus diisi',
  nisNotNumber: 'nis harus berupa angka',
  emptyJenisKelamin: 'jenis kelamin harus diisi',
  emptyTempatLahir: 'tempat lahir harus diisi',
  emptyTanggalLahir: 'tanggal lahir harus diisi',
  emptyNamaAyah: 'nama ayah siswa harus diisi',
  emptyNamaIbu: 'nama ibu siswa harus diisi',
  emptyAlamat: 'alamat harus diisi',
  emptyEmail: 'email harus diisi',
  emailNotValid: 'email tidak valid',
  emptyNomorHP: 'nomor HP harus diisi',
  nomorHPNotValid: 'nomor HP tidak valid',
  emptyTahunAngkatan: 'tahun angkatan harus diisi',
  tahunAngkatanNotValid: 'tahun angkatan tidak valid',
};

function createSiswaValidation(request) {
  const {
    user_id,
    nama,
    nisn,
    nis,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    namaAyah,
    namaIbu,
    alamat,
    email,
    nomorHP,
    tahunAngkatan,
    status,
  } = request.body;

  if (!user_id) throw new CustomError(400, errorMessage.emptyUserId);
  if (!nama) throw new CustomError(400, errorMessage.emptyNama);
  if (nama.length < 3) throw new CustomError(400, errorMessage.shortNama);
  if (!nisn) throw new CustomError(400, errorMessage.emptyNisn);
  if (!containsOnlyNumbers(nisn))
    throw new CustomError(400, errorMessage.nisnNotNumber);
  if (!nis) throw new CustomError(400, errorMessage.emptyNis);
  if (!containsOnlyNumbers(nis))
    throw new CustomError(400, errorMessage.nisNotNumber);
  if (!jenisKelamin) throw new CustomError(400, errorMessage.emptyJenisKelamin);
  if (!tempatLahir) throw new CustomError(400, errorMessage.emptyTempatLahir);
  if (!tanggalLahir) throw new CustomError(400, errorMessage.emptyTanggalLahir);
  if (!namaAyah) throw new CustomError(400, errorMessage.emptyNamaAyah);
  if (!namaIbu) throw new CustomError(400, errorMessage.emptyNamaIbu);
  if (!alamat) throw new CustomError(400, errorMessage.emptyAlamat);
  if (!email) throw new CustomError(400, errorMessage.emptyEmail);
  if (!validateEmail(email))
    throw new CustomError(400, errorMessage.emailNotValid);
  if (!nomorHP) throw new CustomError(400, errorMessage.emptyNomorHP);
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, errorMessage.nomorHPNotValid);
  if (!tahunAngkatan)
    throw new CustomError(400, errorMessage.emptyTahunAngkatan);
  if (tahunAngkatan.length > 4 || !containsOnlyNumbers(tahunAngkatan))
    throw new CustomError(400, errorMessage.tahunAngkatanNotValid);

  request.body = {
    ...request.body,
    id: generateSiswaID(nisn, nama),
    status: generateStatusSiswa(status),
  };

  return request.body;
}

async function updateSiswaValidation(request) {
  const { id } = request.params,
    {
      user_id,
      nama,
      nisn,
      nis,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      namaAyah,
      namaIbu,
      alamat,
      email,
      nomorHP,
      tahunAngkatan,
      status,
    } = request.body;

  let siswaData = await prisma.siswa.findUnique({
    where: {
      id,
    },
  });

  if (!siswaData) throw new CustomError(404, errorMessage.userNotFound);
  if (!user_id) throw new CustomError(400, errorMessage.emptyUserId);
  if (!nama) throw new CustomError(400, errorMessage.emptyNama);
  if (nama.length < 3) throw new CustomError(400, errorMessage.shortNama);
  if (!nisn) throw new CustomError(400, errorMessage.emptyNisn);
  if (!containsOnlyNumbers(nisn))
    throw new CustomError(400, errorMessage.nisnNotNumber);
  if (!nis) throw new CustomError(400, errorMessage.emptyNis);
  if (!containsOnlyNumbers(nis))
    throw new CustomError(400, errorMessage.nisNotNumber);
  if (!jenisKelamin) throw new CustomError(400, errorMessage.emptyJenisKelamin);
  if (!tempatLahir) throw new CustomError(400, errorMessage.emptyTempatLahir);
  if (!tanggalLahir) throw new CustomError(400, errorMessage.emptyTanggalLahir);
  if (!namaAyah) throw new CustomError(400, errorMessage.emptyNamaAyah);
  if (!namaIbu) throw new CustomError(400, errorMessage.emptyNamaIbu);
  if (!alamat) throw new CustomError(400, errorMessage.emptyAlamat);
  if (!email) throw new CustomError(400, errorMessage.emptyEmail);
  if (!validateEmail(email))
    throw new CustomError(400, errorMessage.emailNotValid);
  if (!nomorHP) throw new CustomError(400, errorMessage.emptyNomorHP);
  if (nomorHP.length < 10 || !containsOnlyNumbers(nomorHP))
    throw new CustomError(400, errorMessage.nomorHPNotValid);
  if (!tahunAngkatan)
    throw new CustomError(400, errorMessage.emptyTahunAngkatan);
  if (tahunAngkatan.length > 4 || !containsOnlyNumbers(tahunAngkatan))
    throw new CustomError(400, errorMessage.tahunAngkatanNotValid);

  siswaData = {
    ...siswaData,
    id: generateSiswaID(nisn, nama),
    nama,
    nisn,
    nis,
    jenisKelamin,
    tempatLahir,
    tanggalLahir,
    namaAyah,
    namaIbu,
    alamat,
    email,
    nomorHP,
    tahunAngkatan,
    status: generateStatusSiswa(status),
  };

  return siswaData;
}

module.exports = {
  createSiswaValidation,
  updateSiswaValidation,
};
