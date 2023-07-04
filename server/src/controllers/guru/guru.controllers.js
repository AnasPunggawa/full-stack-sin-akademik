const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createGuruValidation,
  updateGuruValidation,
} = require('../../validation/guruValidation');
const {
  find_all_datas,
  find_single_data,
  create_data,
  check_user_id,
  check_guru_has_user_id,
  check_nip,
  check_email,
  check_guru_id,
  update_data,
  delete_data,
  find_details_single_data,
  count_all_datas,
} = require('./repository');

async function getAllGuru(req, res, next) {
  try {
    const { searchNama = '', page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await find_all_datas(searchNama, limit, skip);
    const countData = await count_all_datas(searchNama);
    const totalPage = Math.ceil(countData / Number(limit));
    if (!data || data.length === 0)
      throw new CustomError(404, 'data guru tidak ditemukan');
    // resSuccessController(res, 200, 'data guru berhasil ditemukan', data);
    resSuccessController(res, 200, 'data guru berhasil ditemukan', {
      current_page: Number(page),
      total_page: totalPage,
      limit_data: Number(limit),
      total_data: countData,
      guru: data,
    });
  } catch (err) {
    next(err);
  }
}

async function getGuru(req, res, next) {
  try {
    const { id } = req.params,
      // data = await find_single_data(id),
      data = await find_details_single_data(id);
    if (!data) throw new CustomError(404, 'data guru tidak ditemukan');
    resSuccessController(res, 200, 'data guru berhasil ditemukan', data);
  } catch (err) {
    next(err);
  }
}

async function createGuru(req, res, next) {
  try {
    // const guruData = req.guru
    // VALIDATE
    const guruData = await createGuruValidation(req);
    const userIDExist = await check_user_id(guruData.user_id);
    if (!userIDExist)
      throw new CustomError(
        404,
        `user_id ${guruData?.user_id} tidak ditemukan`
      );
    const userHasUserIDExist = await check_guru_has_user_id(guruData.user_id);
    if (userHasUserIDExist)
      throw new CustomError(
        409,
        `username ${userIDExist.username} telah digunakan`
      );
    const userIDExistRole = userIDExist.role.toLowerCase();
    if (userIDExistRole !== 'guru')
      throw new CustomError(409, `user_id ${userIDExist.user_id} bukan guru`);
    const nipExist = await check_nip(guruData.nip);
    if (nipExist)
      throw new CustomError(409, `nip ${guruData.nip} telah tersedia`);
    const emailExist = await check_email(guruData.email);
    if (emailExist)
      throw new CustomError(409, `email ${guruData.email} telah tersedia`);
    const createData = await create_data(guruData);
    resSuccessController(res, 201, 'data guru berhasil dibuat', createData);
  } catch (err) {
    next(err);
  }
}

async function updateGuru(req, res, next) {
  try {
    const { id } = req.params;
    // const guruData = req.guru;
    // VALIDATE
    const guruData = await updateGuruValidation(req);
    // console.log(guruData);
    const guruIDExist = await check_guru_id(id);
    if (!guruIDExist) throw new CustomError(404, 'data guru tidak ditemukan');
    if (guruIDExist.user_id !== guruData.user_id)
      throw new CustomError(409, 'tidak boleh mengubah user_id');
    const nipExist = await check_nip(guruData.nip);
    if (nipExist && nipExist.nip !== guruIDExist.nip)
      throw new CustomError(409, `nip ${guruData.nip} telah tersedia`);
    const emailExist = await check_email(guruData.email);
    if (emailExist && emailExist.email !== guruIDExist.email)
      throw new CustomError(409, `email ${guruData.email} telah tersedia`);
    console.log('coba');
    const updateData = await update_data(id, guruData);
    resSuccessController(res, 202, 'data guru berhasil diperbarui', updateData);
  } catch (err) {
    next(err);
  }
}

async function deleteGuru(req, res, next) {
  try {
    const { id } = req.params;
    const guruIDExist = await check_guru_id(id);
    if (!guruIDExist) throw new CustomError(404, 'data guru tidak ditemukan');
    const deleleData = await delete_data(id);
    resSuccessController(res, 202, 'data guru berhasil dihapus', deleleData);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllGuru,
  getGuru,
  createGuru,
  updateGuru,
  deleteGuru,
};
