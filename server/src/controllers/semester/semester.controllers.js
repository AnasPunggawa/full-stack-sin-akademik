const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createSemesterValidation,
  updateSemesterValidation,
} = require('../../validation/semesterValidation');
const {
  find_all_datas,
  find_single_data,
  check_kode_semester,
  create_data,
  find_details_single_data,
  check_semester_id,
  update_data,
  delete_data,
  count_all_datas,
} = require('./repository');

async function getAllSemester(req, res, next) {
  try {
    const {
      tingkat = '',
      searchSemester = '',
      page = 1,
      limit = 10,
    } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await find_all_datas(tingkat, searchSemester, limit, skip);
    const countData = await count_all_datas(tingkat, searchSemester);
    const totalPage = Math.ceil(countData / Number(limit));
    if (!data || data.length === 0)
      throw new CustomError(404, 'data semester tidak ditemukan');
    resSuccessController(res, 200, 'data semester berhasil ditemukan', {
      current_page: Number(page),
      total_page: totalPage,
      limit_data: Number(limit),
      total_data: countData,
      semester: data,
    });
  } catch (err) {
    next(err);
  }
}

async function getSemester(req, res, next) {
  try {
    const { id } = req.params;
    // const data = await find_single_data(id);
    const data = await find_details_single_data(id);
    if (!data) throw new CustomError(404, 'data semester tidak ditemukan');
    resSuccessController(res, 200, 'data semester berhasil ditemukan', data);
  } catch (err) {
    next(err);
  }
}

async function createSemester(req, res, next) {
  try {
    // const semesterData = req.semester;
    // VALIDATE
    const semesterData = await createSemesterValidation(req);
    semesterExist = await check_kode_semester(semesterData.kodeSemester);
    if (semesterExist)
      throw new CustomError(
        409,
        `semester ${semesterData.semester} tahun ajaran ${semesterData.tahunAjaran} telah tersedia`
      );
    const createData = await create_data(semesterData);
    resSuccessController(res, 202, 'data semester berhasil dibuat', createData);
  } catch (err) {
    next(err);
  }
}

async function updateSemester(req, res, next) {
  try {
    const { id } = req.params;
    // const semesterData = req.semester;
    // VALIDATE
    const semesterData = await updateSemesterValidation(req);
    const semesterIDExist = await check_semester_id(id);
    if (!semesterIDExist)
      throw new CustomError(404, 'data semester tidak ditemukan');
    const semesterExist = await check_kode_semester(semesterData.kodeSemester);
    if (
      semesterExist &&
      semesterData.kodeSemester !== semesterIDExist.kodeSemester
    )
      throw new CustomError(
        409,
        `semester ${semesterData.semester} tahun ajaran ${semesterData.tahunAjaran} telah tersedia`
      );
    const updateData = await update_data(id, semesterData);
    resSuccessController(
      res,
      202,
      'data semester berhasil diperbarui',
      updateData
    );
  } catch (err) {
    next(err);
  }
}

async function deleteSemester(req, res, next) {
  try {
    const { id } = req.params,
      semesterIDExist = await check_semester_id(id);
    if (!semesterIDExist)
      throw new CustomError(404, 'data semester tidak ditemukan');
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
  getAllSemester,
  getSemester,
  createSemester,
  updateSemester,
  deleteSemester,
};
