// const prisma = require('../../prisma/seed');
const { prisma } = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { containsOnlyNumbers, validateEmail } = require('../utils/RegExp');

const errorMessage = {
  kontakSekolahNotFound: 'kontak sekolah tidak ditemukan',
  NPSNNotFound: 'NPSN tidak ditemukan',
  emptyNPSN: 'NPSN harus diisi',
  NPSNNotNumber: 'NPSN harus berupa angka',
  rtNotValid: 'RT tidak valid',
  rwNotValid: 'RW tidak valid',
  kodePosNotValid: 'kode pos tidak valid',
  nomorTeleponNotValid: 'nomor telepon tidak valid',
  emailNotValid: 'email tidak valid',
};

function createSekolahKontakValidation(request) {
  const {
    npsn,
    alamat,
    rt,
    rw,
    dusun,
    desa_kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    kode_pos,
    nomor_telepon,
    email,
  } = request.body;

  if (!npsn) throw new CustomError(400, errorMessage.emptyNPSN);
  if (!containsOnlyNumbers(npsn))
    throw new CustomError(400, errorMessage.NPSNNotNumber);
  if (!containsOnlyNumbers(rt))
    throw new CustomError(400, errorMessage.rtNotValid);
  if (!containsOnlyNumbers(rw))
    throw new CustomError(400, errorMessage.rwNotValid);
  if (!containsOnlyNumbers(kode_pos))
    throw new CustomError(400, errorMessage.kodePosNotValid);
  if (!containsOnlyNumbers(nomor_telepon))
    throw new CustomError(400, errorMessage.nomorTeleponNotValid);
  if (!validateEmail(email))
    throw new CustomError(400, errorMessage.emailNotValid);

  request.body = {
    ...request.body,
    id: npsn,
    npsn: npsn,
    alamat: alamat || '-',
    rt: rt || '-',
    rw: rw || '-',
    dusun: dusun || '-',
    desa_kelurahan: desa_kelurahan || '-',
    kecamatan: kecamatan || '-',
    kabupaten: kabupaten || '-',
    provinsi: provinsi || '-',
    kode_pos: kode_pos || '-',
    nomor_telepon: nomor_telepon || '-',
    email: email || '-',
  };

  return request.body;
}

async function updateSekolahKontakValidation(request) {
  const { id } = request.params,
    {
      npsn,
      alamat,
      rt,
      rw,
      dusun,
      desa_kelurahan,
      kecamatan,
      kabupaten,
      provinsi,
      kode_pos,
      nomor_telepon,
      email,
    } = request.body;

  let dataKontakSekolah = await prisma.kontak_sekolah.findUnique({
    where: {
      id,
    },
  });

  if (!dataKontakSekolah)
    throw new CustomError(404, errorMessage.kontakSekolahNotFound);
  if (!npsn) throw new CustomError(400, errorMessage.emptyNPSN);
  if (!containsOnlyNumbers(npsn))
    throw new CustomError(400, errorMessage.NPSNNotNumber);
  if (!containsOnlyNumbers(rt))
    throw new CustomError(400, errorMessage.rtNotValid);
  if (!containsOnlyNumbers(rw))
    throw new CustomError(400, errorMessage.rwNotValid);
  if (!containsOnlyNumbers(kode_pos))
    throw new CustomError(400, errorMessage.kodePosNotValid);
  if (!containsOnlyNumbers(nomor_telepon))
    throw new CustomError(400, errorMessage.nomorTeleponNotValid);
  if (!validateEmail(email))
    throw new CustomError(400, errorMessage.emailNotValid);

  dataKontakSekolah = {
    ...dataKontakSekolah,
    id: npsn,
    npsn: npsn,
    alamat: alamat || '-',
    rt: rt || '-',
    rw: rw || '-',
    dusun: dusun || '-',
    desa_kelurahan: desa_kelurahan || '-',
    kecamatan: kecamatan || '-',
    kabupaten: kabupaten || '-',
    provinsi: provinsi || '-',
    kode_pos: kode_pos || '-',
    nomor_telepon: nomor_telepon || '-',
    email: email || '-',
  };

  return dataKontakSekolah;
}

module.exports = {
  createSekolahKontakValidation,
  updateSekolahKontakValidation,
};
