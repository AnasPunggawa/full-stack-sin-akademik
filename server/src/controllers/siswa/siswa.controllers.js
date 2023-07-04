const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createSiswaValidation,
  updateSiswaValidation,
} = require('../../validation/siswaValidation');
const {
  find_all_datas,
  find_single_data,
  find_details_single_data,
  check_user_id,
  check_siswa_has_user_id,
  check_nisn,
  check_nis,
  check_email,
  create_data,
  check_siswa_id,
  update_data,
  delete_data,
} = require('./repository');

async function getAllSiswa(req, res, next) {
  try {
    const data = await find_all_datas();
    if (!data) throw new CustomError(404, 'data siswa tidak ditemukan');
    resSuccessController(res, 200, 'data siswa berhasil ditemukan', data);
  } catch (error) {
    next(err);
  }
}
async function getSiswa(req, res, next) {
  try {
    const { id } = req.params;
    // const data = await find_single_data(id);
    const data = await find_details_single_data(id);
    if (!data) throw new CustomError(404, 'data siswa tidak ditemukan');
    resSuccessController(res, 200, 'data siswa berhasil ditemukan', data);
  } catch (err) {
    next(err);
  }
}

async function createSiswa(req, res, next) {
  try {
    // const siswaData = req.siswa;
    const siswaData = await createSiswaValidation(req);
    const userIDExist = await check_user_id(siswaData.user_id);
    if (!userIDExist)
      throw new CustomError(
        404,
        `user_id ${siswaData.user_id} tidak ditemukan`
      );
    const userIDExistRole = userIDExist.role.toLowerCase();
    if (userIDExistRole !== 'siswa')
      throw new CustomError(409, `user_id ${siswaData.user_id} bukan siswa`);
    const userHasUserIDExist = await check_siswa_has_user_id(siswaData.user_id);
    if (userHasUserIDExist)
      throw new CustomError(
        409,
        `user_id ${siswaData.user_id} telah digunakan`
      );
    const nisnExist = await check_nisn(siswaData.nisn);
    if (nisnExist)
      throw new CustomError(409, `nisn ${siswaData.nisn} telah tersedia`);
    const nisExist = await check_nis(siswaData.nis);
    if (nisExist)
      throw new CustomError(409, `nis ${siswaData.nis} telah tersedia`);
    const emailExist = await check_email(siswaData.email);
    if (emailExist)
      throw new CustomError(409, `email ${siswaData.email} telah tersedia`);
    const createData = await create_data(siswaData);
    resSuccessController(res, 200, 'data siswa berhasil dibuat', createData);
  } catch (err) {
    next(err);
  }
}
async function updateSiswa(req, res, next) {
  try {
    const { id } = req.params;
    // const siswaData = req.siswa;
    const siswaData = await updateSiswaValidation(req);
    const siswaIDExist = await check_siswa_id(id);
    if (!siswaIDExist) throw new CustomError(404, 'data siswa tidak ditemukan');
    if (siswaIDExist && siswaIDExist.user_id !== siswaData.user_id)
      throw new CustomError(409, 'tidak boleh mengubah user_id');
    const nisnExist = await check_nisn(siswaData.nisn);
    if (nisnExist && siswaData.nisn !== siswaIDExist.nisn)
      throw new CustomError(409, `nisn ${siswaData.nisn} telah tersedia`);
    const nisExist = await check_nis(siswaData.nis);
    if (nisExist && siswaData.nis !== siswaIDExist.nis)
      throw new CustomError(409, `nis ${siswaData.nis} telah tersedia`);
    const emailExist = await check_email(siswaData.email);
    if (emailExist && siswaData.email !== siswaIDExist.email)
      throw new CustomError(409, `email ${siswaData.email} telah tersedia`);
    const updateData = await update_data(id, siswaData);
    resSuccessController(
      res,
      202,
      'data siswa berhasil diperbarui',
      updateData
    );
  } catch (err) {
    next(err);
  }
}
async function deleteSiswa(req, res, next) {
  try {
    const { id } = req.params,
      siswaIDExist = await check_siswa_id(id);
    if (!siswaIDExist) throw new CustomError(404, 'data siswa tidak ditemukan');
    const deleteData = await delete_data(id);
    resSuccessController(res, 202, 'data siswa berhasil dihapus', deleteData);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllSiswa,
  getSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa,
};
