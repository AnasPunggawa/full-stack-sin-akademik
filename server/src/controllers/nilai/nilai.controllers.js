const prisma = require('../../../prisma/seed');
const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createNilaiValidation,
  updateNilaiValidation,
} = require('../../validation/nilaiValidation');
const {
  find_all_datas,
  find_single_data,
  check_siswa_id,
  check_kelas_id,
  check_matapelajaran_id,
  check_nilai_id,
  create_data,
  update_data,
  delete_data,
  check_semester_id,
  count_all_datas,
  check_guru_id,
} = require('./repository');

async function getAllNilai(req, res, next) {
  try {
    const {
      searchNama = '',
      siswaID = '',
      kodeSemester = '',
      kodeKelas = '',
      kodeMataPelajaran = '',
      page = 1,
      limit = 10,
    } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await find_all_datas(
      searchNama,
      siswaID,
      kodeSemester,
      kodeKelas,
      kodeMataPelajaran,
      limit,
      skip
    );

    const countData = await count_all_datas(
      searchNama,
      kodeSemester,
      kodeKelas,
      kodeMataPelajaran
    );
    const totalPage = Math.ceil(countData / Number(limit));

    if (!data || data.length === 0)
      throw new CustomError(404, 'data nilai tidak ditemukan');
    resSuccessController(res, 200, 'data nilai berhasil ditemukan', {
      current_page: Number(page),
      total_page: totalPage,
      limit_data: Number(limit),
      total_data: countData,
      nilai: data,
    });
  } catch (err) {
    next(err);
  }
}

async function getNilai(req, res, next) {
  try {
    const { id } = req.params,
      data = await find_single_data(id);
    if (!data) throw new CustomError(404, 'data nilai tidak ditemukan');
    resSuccessController(res, 200, 'data nilai berhasil ditemukan', data);
  } catch (err) {
    next(err);
  }
}
async function createNilai(req, res, next) {
  try {
    // const nilaiData = req.nilai;
    // VALIDATION
    const nilaiData = await createNilaiValidation(req);
    const siswaIDExist = await check_siswa_id(nilaiData.siswa_id);
    if (!siswaIDExist) throw new CustomError(404, 'siswa tidak ditemukan');
    if (!siswaIDExist.status)
      throw new CustomError(403, 'siswa sudah tidak aktif');
    const semesterIDExist = await check_semester_id(nilaiData.semester_id);
    if (!semesterIDExist)
      throw new CustomError(404, 'semester belum terdaftar');
    if (!semesterIDExist.status)
      throw new CustomError(403, 'semester sudah tidak aktif');
    const kelasIDExist = await check_kelas_id(nilaiData.kelas_id);
    if (!kelasIDExist) throw new CustomError(404, 'kelas tidak ditemukan');
    const matapelajaranIDExist = await check_matapelajaran_id(
      nilaiData.matapelajaran_id
    );
    if (!matapelajaranIDExist)
      throw new CustomError(404, 'mata pelajaran tidak ditemukan');
    const guruIDExist = await check_guru_id(nilaiData.guru_id);
    if (!guruIDExist) throw new CustomError(404, 'guru belum terdaftar');
    if (!guruIDExist.status)
      throw new CustomError(403, 'guru sudah tidak aktif');
    const nilaiIDExist = await check_nilai_id(nilaiData.id);
    if (nilaiIDExist)
      throw new CustomError(409, `nilai siswa ${siswaIDExist.nama} sudah ada`);
    const createData = await create_data(nilaiData);
    resSuccessController(res, 202, 'data nilai berhasil dibuat', createData);
  } catch (err) {
    next(err);
  }
}

async function updateNilai(req, res, next) {
  try {
    const { id } = req.params;
    // const nilaiData = req.nilai;
    // VALIDATION
    const nilaiData = await updateNilaiValidation(req);
    const nilaiIDExist = await check_nilai_id(id);
    if (!nilaiIDExist) throw new CustomError(404, 'data nilai tidak ditemukan');
    const siswaIDExist = await check_siswa_id(nilaiData.siswa_id);
    if (!siswaIDExist) throw new CustomError(404, 'siswa tidak ditemukan');
    if (!siswaIDExist.status)
      throw new CustomError(403, 'siswa sudah tidak aktif');
    const semesterIDExist = await check_semester_id(nilaiData.semester_id);
    if (!semesterIDExist)
      throw new CustomError(404, 'semester tidak ditemukan');
    if (!semesterIDExist.status)
      throw new CustomError(403, 'semester sudah tidak aktif');
    const kelasIDExist = await check_kelas_id(nilaiData.kelas_id);
    if (!kelasIDExist) throw new CustomError(404, 'kelas tidak ditemukan');
    const matapelajaranIDExist = await check_matapelajaran_id(
      nilaiData.matapelajaran_id
    );
    if (!matapelajaranIDExist)
      throw new CustomError(404, 'mata pelajaran tidak ditemukan');
    const guruIDExist = await check_guru_id(nilaiData.guru_id);
    if (!guruIDExist) throw new CustomError(404, 'guru tidak ditemukan');
    if (!guruIDExist.status)
      throw new CustomError(403, 'guru sudah tidak aktif');
    const updateData = await update_data(id, nilaiData);
    resSuccessController(
      res,
      202,
      'data nilai berhasil diperbarui',
      updateData
    );
  } catch (err) {
    next(err);
  }
}

async function deleteNilai(req, res, next) {
  try {
    const { id } = req.params,
      nilaiIDExist = await check_nilai_id(id);
    if (!nilaiIDExist) throw new CustomError(404, 'data nilai tidak ditemukan');
    const deleteData = await delete_data(id);
    resSuccessController(
      res,
      202,
      'data semester berhasil dihapus',
      deleteData
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllNilai,
  getNilai,
  createNilai,
  updateNilai,
  deleteNilai,
};
