const prisma = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { containsOnlyNumbers } = require('../utils/RegExp');

const errorMessage = {
  identitasSekolahNotFound: 'identitas sekolah tidak ditemukan',
  NPSNNotFound: 'NPSN tidak ditemukan',
  emptyNPSN: 'NPSN harus diisi',
  NPSNNotNumber: 'NPSN harus berupa angka',
};

function createSekolahIdentitasValidation(request) {
  const {
    npsn,
    status,
    bentuk_pendidikan,
    status_kepemilikan,
    sk_pendirian_sekolah,
    tanggal_sk_pendirian,
    sk_izin_operasional,
    tanggal_sk_izin_operasional,
  } = request.body;

  if (!npsn) throw new CustomError(400, errorMessage.emptyNPSN);
  if (!containsOnlyNumbers(npsn))
    throw new CustomError(400, errorMessage.NPSNNotNumber);

  request.body = {
    ...request.body,
    id: npsn,
    npsn: npsn,
    status: status || '-',
    bentuk_pendidikan: bentuk_pendidikan || '-',
    status_kepemilikan: status_kepemilikan || '-',
    sk_pendirian_sekolah: sk_pendirian_sekolah || '-',
    tanggal_sk_pendirian: tanggal_sk_pendirian || '-',
    sk_izin_operasional: sk_izin_operasional || '-',
    tanggal_sk_izin_operasional: tanggal_sk_izin_operasional || '-',
  };

  return request.body;
}

async function updateSekolahIdentitasValidation(request) {
  const { id } = request.params,
    {
      npsn,
      status,
      bentuk_pendidikan,
      status_kepemilikan,
      sk_pendirian_sekolah,
      tanggal_sk_pendirian,
      sk_izin_operasional,
      tanggal_sk_izin_operasional,
    } = request.body;

  let dataIdentitasSekolah = await prisma.identitas_sekolah.findUnique({
    where: {
      id,
    },
  });

  if (!dataIdentitasSekolah)
    throw new CustomError(404, errorMessage.identitasSekolahNotFound);
  if (!npsn) throw new CustomError(400, errorMessage.emptyNPSN);
  if (!containsOnlyNumbers(npsn))
    throw new CustomError(400, errorMessage.NPSNNotNumber);

  dataIdentitasSekolah = {
    ...dataIdentitasSekolah,
    id: npsn,
    npsn: npsn,
    status: status || '-',
    bentuk_pendidikan: bentuk_pendidikan || '-',
    status_kepemilikan: status_kepemilikan || '-',
    sk_pendirian_sekolah: sk_pendirian_sekolah || '-',
    tanggal_sk_pendirian: tanggal_sk_pendirian || '-',
    sk_izin_operasional: sk_izin_operasional || '-',
    tanggal_sk_izin_operasional: tanggal_sk_izin_operasional || '-',
  };

  return dataIdentitasSekolah;
}

module.exports = {
  createSekolahIdentitasValidation,
  updateSekolahIdentitasValidation,
};
