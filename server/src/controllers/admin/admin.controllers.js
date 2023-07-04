const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createAdminValidation,
  updateAdminValidation,
} = require('../../validation/adminValidation');
const {
  find_all_datas,
  find_single_data,
  find_details_single_data,
  create_data,
  update_data,
  delete_data,
  check_admin_id,
  check_user_id,
  check_admin_has_user_id,
  check_email,
} = require('./repository');

async function getAllAdmin(req, res, next) {
  try {
    const data = await find_all_datas();
    if (!data) throw new CustomError(404, 'data admin tidak ditemukan');
    resSuccessController(res, 200, 'data admin berhasil ditemukan', data);
    // res.status(200).json({ success: true, message: 'admin found', data });
  } catch (err) {
    next(err);
  }
}

async function getAdmin(req, res, next) {
  try {
    const { id } = req.params;
    // const data = await find_single_data(id);
    const data = await find_details_single_data(id);
    if (!data) throw new CustomError(404, 'data admin tidak ditemukan');
    resSuccessController(res, 200, 'data admin berhasil ditemukan', data);
    // res.status(200).json({ success: true, message: 'admin found', data });
  } catch (err) {
    next(err);
  }
}

async function createAdmin(req, res, next) {
  try {
    // const adminData = req.admin,
    // VALIDATE
    const adminData = await createAdminValidation(req);

    const userIdExist = await check_user_id(adminData.user_id);
    if (!userIdExist)
      throw new CustomError(
        404,
        `user_id ${adminData.user_id} tidak ditemukan`
      );
    const userHasUserIDExist = await check_admin_has_user_id(adminData.user_id);
    if (userHasUserIDExist)
      throw new CustomError(
        409,
        `user_id ${adminData.user_id} telah digunakan`
      );
    const userIdExistRole = userIdExist.role.toLowerCase();
    if (userIdExistRole !== 'admin')
      throw new CustomError(400, `user_id ${userIdExist.id} bukan admin`);
    const emailExist = await check_email(adminData.email);
    if (emailExist)
      throw new CustomError(409, `email ${adminData.email} telah tersedia`);
    const createData = await create_data(adminData);
    resSuccessController(res, 201, 'data admin berhasil dibuat', createData);
    // res.status(201).json({
    //   success: true,
    //   message: 'admin has created',
    //   createData,
    // });
  } catch (err) {
    next(err);
  }
}

async function updateAdmin(req, res, next) {
  try {
    const { id } = req.params;
    // const adminData = req.admin;
    // VALIDATE
    const adminData = await updateAdminValidation(req);
    const adminIDExist = await check_admin_id(id);
    const emailExist = await check_email(adminData.email);
    if (!adminIDExist) throw new CustomError(404, 'data admin tidak ditemukan');
    if (adminIDExist.user_id !== adminData.user_id)
      throw new CustomError(409, 'tidak boleh mengubah user_id');
    if (emailExist && emailExist.email !== adminIDExist.email)
      throw new CustomError(409, `email ${adminData.email} telah tersedia`);
    const updateData = await update_data(id, adminData);
    resSuccessController(
      res,
      202,
      'data admin berhasil diperbarui',
      updateData
    );
    // res.status(202).json({
    //   success: true,
    //   message: 'admin has updated',
    //   updateData,
    // });
  } catch (err) {
    next(err);
  }
}

async function deleteAdmin(req, res, next) {
  try {
    const { id } = req.params,
      adminIDExist = await check_admin_id(id);
    if (!adminIDExist)
      throw new CustomError(404, 'data admin tidak ditemukan!');
    const deleteData = await delete_data(id);
    resSuccessController(res, 202, 'data admin berhasil dihapus', deleteData);
    // res.status(202).json({
    //   success: true,
    //   message: 'admin has deleted',
    //   deleteData,
    // });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAdmin,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
