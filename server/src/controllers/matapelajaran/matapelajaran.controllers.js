const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createMataPelajaranValidation,
  updateMataPelajaranValidation,
} = require('../../validation/mataPelajaranValidation');
const {
  find_all_datas,
  find_single_data,
  check_matapelajaran_id,
  create_data,
  delete_data,
  check_matapelajaran_nama,
  update_data,
  count_all_datas,
} = require('./repository');

async function getAllMatapelajaran(req, res, next) {
  try {
    const { searchNama = '', page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await find_all_datas(searchNama, limit, skip);
    const countData = await count_all_datas(searchNama);
    const totalPage = Math.ceil(countData / Number(limit));
    if (!data || data.length === 0)
      throw new CustomError(404, 'data mata pelajaran tidak ditemukan');
    resSuccessController(res, 200, 'data mata pelajaran berhasil ditemukan', {
      current_page: Number(page),
      total_page: totalPage,
      limit_data: Number(limit),
      total_data: countData,
      mataPelajaran: data,
    });
  } catch (err) {
    next(err);
  }
}
async function getMatapelajaran(req, res, next) {
  try {
    const { id } = req.params,
      data = await find_single_data(id);
    if (!data) throw new CustomError(404, 'data matapelajaran tidak ditemukan');
    resSuccessController(
      res,
      200,
      'data matapelajaran berhasil ditemukan',
      data
    );
  } catch (err) {
    next(err);
  }
}

async function createMatapelajaran(req, res, next) {
  try {
    // const matapelajaranData = req.matapelajaran;
    // VALIDATION
    const matapelajaranData = await createMataPelajaranValidation(req);
    const matapelajaranExist = await check_matapelajaran_id(
      matapelajaranData.id
    );
    if (matapelajaranExist)
      throw new CustomError(
        409,
        `mata pelajaran ${matapelajaranData.nama.toLowerCase()} telah tersedia`
      );
    const createData = await create_data(matapelajaranData);
    resSuccessController(
      res,
      202,
      'data matapelajaran berhasil dibuat',
      createData
    );
  } catch (err) {
    next(err);
  }
}
async function updateMatapelajaran(req, res, next) {
  try {
    const { id } = req.params;
    // const matapelajaranData = req.matapelajaran;
    // VALIDATION
    const matapelajaranData = await updateMataPelajaranValidation(req);
    const matapelajaranIDExist = await check_matapelajaran_id(id);
    if (!matapelajaranIDExist)
      throw new CustomError(404, 'data matapelajaran tidak ditemukan');
    const matapelajaranExist = await check_matapelajaran_nama(
      matapelajaranData.nama
    );
    if (
      matapelajaranExist &&
      matapelajaranData.nama !== matapelajaranIDExist.nama
    )
      throw new CustomError(
        409,
        `mata pelajaran ${matapelajaranData.nama.toLowerCase()} telah tersedia`
      );
    const updateData = await update_data(id, matapelajaranData);
    resSuccessController(
      res,
      202,
      'data matapelajaran berhasil diperbarui',
      updateData
    );
  } catch (err) {
    next(err);
  }
}

async function deleteMatapelajaran(req, res, next) {
  try {
    const { id } = req.params,
      matapelajaranExist = await check_matapelajaran_id(id);
    if (!matapelajaranExist)
      throw new CustomError(404, 'data matapelajaran tidak ditemukan');
    const deleteData = await delete_data(id);
    resSuccessController(
      res,
      202,
      'data mata pelajaran berhasil dihapus',
      deleteData
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllMatapelajaran,
  getMatapelajaran,
  createMatapelajaran,
  updateMatapelajaran,
  deleteMatapelajaran,
};
