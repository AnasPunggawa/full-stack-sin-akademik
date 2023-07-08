const prisma = require('../../prisma/seed');
const CustomError = require('../utils/CustomError');
const { generateNilaiID } = require('../utils/GenerateNilai');
const { getCurrentDate } = require('../utils/GenerateTime');
const { containsOnlyNumbers, containsOnlyString } = require('../utils/RegExp');

const errorMessage = {
  nilaiNotFound: 'nilai tidak ditemukan',
  emptySiswa: 'siswa harus diisi',
  emptySemester: 'semester harus diisi',
  emptyKelas: 'kelas harus diisi',
  emptyMataPelajaran: 'mata pelajaran harus diisi',
  emptyGuru: 'guru harus diisi',
  emptyNilai: 'nilai harus diisi',
  nilaiNotValid: 'nilai tidak valid',
  emptyPredikat: 'predikat harus diisi',
  predikatNotValid: 'predikat tidak valid',
  emptyCatatan: 'catatan harus diisi',
};

function createNilaiValidation(request) {
  const {
    siswa_id,
    semester_id,
    kelas_id,
    matapelajaran_id,
    guru_id,
    nilai,
    predikat,
    catatan,
  } = request.body;

  if (!siswa_id) throw new CustomError(400, errorMessage.emptySiswa);
  if (!semester_id) throw new CustomError(400, errorMessage.emptySemester);
  if (!kelas_id) throw new CustomError(400, errorMessage.emptyKelas);
  if (!matapelajaran_id)
    throw new CustomError(400, errorMessage.emptyMataPelajaran);
  if (!guru_id) throw new CustomError(400, errorMessage.emptyGuru);
  if (!containsOnlyNumbers(nilai) || nilai > 100)
    throw new CustomError(400, errorMessage.nilaiNotValid);
  if (!predikat) throw new CustomError(400, errorMessage.emptyPredikat);
  if (predikat.length !== 1 || !containsOnlyString(predikat))
    throw new CustomError(400, errorMessage.predikatNotValid);
  if (!catatan) throw new CustomError(400, errorMessage.emptyCatatan);

  request.body = {
    ...request.body,
    id: generateNilaiID(siswa_id, semester_id, kelas_id, matapelajaran_id),
    siswa_id,
    semester_id,
    kelas_id,
    matapelajaran_id,
    guru_id,
    nilai,
    predikat: predikat.toUpperCase(),
    catatan,
    tanggal: getCurrentDate(),
  };

  return request.body;
}

async function updateNilaiValidation(request) {
  const { id } = request.params,
    {
      siswa_id,
      semester_id,
      kelas_id,
      matapelajaran_id,
      guru_id,
      nilai,
      predikat,
      catatan,
    } = request.body;

  let nilaiData = await prisma.nilai.findUnique({
    where: {
      id,
    },
  });

  if (!nilaiData) throw new CustomError(404, errorMessage.nilaiNotFound);
  if (!siswa_id) throw new CustomError(400, errorMessage.emptySiswa);
  if (!semester_id) throw new CustomError(400, errorMessage.emptySemester);
  if (!kelas_id) throw new CustomError(400, errorMessage.emptyKelas);
  if (!matapelajaran_id)
    throw new CustomError(400, errorMessage.emptyMataPelajaran);
  if (!guru_id) throw new CustomError(400, errorMessage.emptyGuru);
  if (!containsOnlyNumbers(nilai) || nilai > 100)
    throw new CustomError(400, errorMessage.nilaiNotValid);
  if (!predikat) throw new CustomError(400, errorMessage.emptyPredikat);
  if (predikat.length !== 1 || !containsOnlyString(predikat))
    throw new CustomError(400, errorMessage.predikatNotValid);
  if (!catatan) throw new CustomError(400, errorMessage.emptyCatatan);

  nilaiData = {
    ...nilaiData,
    id: generateNilaiID(siswa_id, semester_id, kelas_id, matapelajaran_id),
    siswa_id,
    semester_id,
    kelas_id,
    matapelajaran_id,
    guru_id,
    nilai,
    predikat: predikat.toUpperCase(),
    catatan,
    tanggal: getCurrentDate(),
  };

  return nilaiData;
}

module.exports = {
  createNilaiValidation,
  updateNilaiValidation,
};
