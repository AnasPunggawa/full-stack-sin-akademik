const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createKelasValidation,
  updateKelasValidation,
} = require('../../validation/kelasValidation');
const {
  find_all_datas,
  find_single_data,
  check_kode_kelas,
  create_data,
  check_kelas_id,
  update_data,
  delete_data,
  count_all_data,
} = require('./repository');

async function getAllKelas(req, res, next) {
  try {
    const { tingkat = '', searchKelas = '', page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await find_all_datas(tingkat, searchKelas, limit, skip);
    const countData = await count_all_data(tingkat, searchKelas);
    const totalPage = Math.ceil(countData / Number(limit));
    if (!data || data.length === 0)
      throw new CustomError(404, 'data kelas tidak ditemukan');
    resSuccessController(res, 200, 'data kelas berhasil ditemukan', {
      current_page: Number(page),
      total_page: totalPage,
      limit_data: Number(limit),
      total_data: countData,
      kelas: data,
    });
  } catch (err) {
    next(err);
  }
}

async function getKelas(req, res, next) {
  try {
    const { id } = req.params,
      data = await find_single_data(id);
    if (!data) throw new CustomError(404, 'data kelas tidak ditemukan');
    resSuccessController(res, 200, 'data kelas berhasil ditemukan', data);
  } catch (err) {
    next(err);
  }
}

async function createKelas(req, res, next) {
  try {
    // const kelasData = req.kelas;
    // VALIDATION
    const kelasData = await createKelasValidation(req);
    const kodeKelasExist = await check_kode_kelas(kelasData.kodeKelas);
    if (kodeKelasExist)
      throw new CustomError(409, `kelas ${kelasData.kodeKelas} telah tersedia`);
    const createData = await create_data(kelasData);
    resSuccessController(res, 202, 'data kelas berhasil dibuat', createData);
  } catch (err) {
    next(err);
  }
}

async function updateKelas(req, res, next) {
  try {
    const { id } = req.params;
    // const kelasData = req.kelas;
    // VALIDATION
    const kelasData = await updateKelasValidation(req);
    const kelasIDExist = await check_kelas_id(id);
    if (!kelasIDExist) throw new CustomError(404, 'data kelas tidak ditemukan');
    const kodeKelasExist = await check_kode_kelas(kelasData.kodeKelas);
    if (kodeKelasExist && kelasData.kodeKelas !== kelasIDExist.kodeKelas)
      throw new CustomError(409, `kelas ${kelasData.kodeKelas} telah tersedia`);
    const updateData = await update_data(id, kelasData);
    resSuccessController(
      res,
      202,
      'data kelas berhasil diperbarui',
      updateData
    );
  } catch (err) {
    next(err);
  }
}

async function deleteKelas(req, res, next) {
  try {
    const { id } = req.params,
      kelasIDExist = await check_kelas_id(id);
    if (!kelasIDExist) throw new CustomError(404, 'data kelas tidak ditemukan');
    const deleteData = await delete_data(id);
    resSuccessController(res, 202, 'data kelas berhasil dihapus', deleteData);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllKelas,
  getKelas,
  createKelas,
  updateKelas,
  deleteKelas,
};
