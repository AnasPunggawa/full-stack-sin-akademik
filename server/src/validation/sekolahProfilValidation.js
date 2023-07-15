// const prisma = require('../../prisma/seed');
const { prisma } = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { containsOnlyNumbers, containsOnlyString } = require('../utils/RegExp');

const errorMessage = {
  profilSekolahNotFound: 'profil sekolah tidak ditemukan',
  NPSNNotFound: 'NPSN tidak ditemukan',
  emptyNPSN: 'NPSN harus diisi',
  NPSNNotNumber: 'NPSN harus berupa angka',
  emptyNamaSekolah: 'nama sekolah harus diisi',
  akreditasiNotValid: 'predikat tidak valid',
};

function createSekolahProfilValidation(request) {
  const { npsn, nama_sekolah, nama_kepala_sekolah, nama_operator, akreditasi } =
    request.body;

  if (!npsn) throw new CustomError(400, errorMessage.emptyNPSN);
  if (!containsOnlyNumbers(npsn))
    throw new CustomError(400, errorMessage.NPSNNotNumber);
  if (!nama_sekolah) throw new CustomError(400, errorMessage.emptyNamaSekolah);
  if (akreditasi.length !== 1 || !containsOnlyString(akreditasi))
    throw new CustomError(400, errorMessage.akreditasiNotValid);

  request.body = {
    ...request.body,
    id: npsn,
    npsn: npsn,
    nama_sekolah: nama_sekolah.toUpperCase(),
    nama_kepala_sekolah: nama_kepala_sekolah || '-',
    nama_operator: nama_operator || '-',
    akreditasi: akreditasi.toUpperCase() || '-',
  };

  return request.body;
}

async function updateSekolahProfilValidation(request) {
  const { id } = request.params,
    { npsn, nama_sekolah, nama_kepala_sekolah, nama_operator, akreditasi } =
      request.body;

  let dataProfilSekolah = await prisma.profil_sekolah.findUnique({
    where: {
      id,
    },
  });

  if (!dataProfilSekolah)
    throw new CustomError(404, errorMessage.profilSekolahNotFound);
  if (!npsn) throw new CustomError(400, errorMessage.emptyNPSN);
  if (!containsOnlyNumbers(npsn))
    throw new CustomError(400, errorMessage.NPSNNotNumber);
  if (!nama_sekolah) throw new CustomError(400, errorMessage.emptyNamaSekolah);
  if (akreditasi.length !== 1 || !containsOnlyString(akreditasi))
    throw new CustomError(400, errorMessage.akreditasiNotValid);

  dataProfilSekolah = {
    ...dataProfilSekolah,
    id: npsn,
    npsn: npsn,
    nama_sekolah: nama_sekolah.toUpperCase(),
    nama_kepala_sekolah: nama_kepala_sekolah || '-',
    nama_operator: nama_operator || '-',
    akreditasi: akreditasi.toUpperCase() || '-',
  };

  return dataProfilSekolah;
}

module.exports = {
  createSekolahProfilValidation,
  updateSekolahProfilValidation,
};
