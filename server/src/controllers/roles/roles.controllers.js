const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createRoleValidation,
  updateRoleValidation,
} = require('../../validation/rolesValidation');
const {
  find_all_datas,
  find_single_data,
  create_data,
  udpate_data,
  delete_data,
  check_role,
} = require('./repository');

async function getAllRoles(req, res, next) {
  try {
    const data = await find_all_datas();
    if (!data) throw new CustomError(404, 'role tidak ditemukan!');
    resSuccessController(res, 200, 'data roles berhasil ditemukan', data);
    // res.status(200).json({ success: true, message: 'roles found', data });
  } catch (err) {
    next(err);
  }
}

async function getRole(req, res, next) {
  try {
    const { id } = req.params;
    const data = await find_single_data(id);
    if (!data) throw new CustomError(404, 'role tidak ditemukan!');
    resSuccessController(res, 200, 'data role berhasil ditemukan', data);
    // res.status(200).json({ success: true, message: 'role found', data });
  } catch (err) {
    next(err);
  }
}

async function createRole(req, res, next) {
  try {
    // const roleData = req.role,
    const roleData = await createRoleValidation(req),
      roleExist = await check_role(roleData.role);
    if (roleExist)
      throw new CustomError(409, `role ${roleData.role} telah tersedia`);
    const createData = await create_data(roleData);
    resSuccessController(res, 201, 'data role berhasil dibuat', createData);
    // res
    //   .status(201)
    //   .json({ success: true, message: 'role has created', createData });
  } catch (err) {
    next(err);
  }
}

async function updateRole(req, res, next) {
  try {
    const { id } = req.params,
      // roleData = req.role,
      roleData = await updateRoleValidation(req),
      roleIDExist = await check_role(id),
      roleExist = await check_role(roleData.role);
    if (!roleIDExist) throw new CustomError(409, `role ${id} tidak ditemukan!`);
    if (roleExist && roleExist.role !== roleIDExist.role)
      throw new CustomError(409, `role ${roleData.role} telah tersedia!`);
    const updateData = await udpate_data(id, roleData);
    resSuccessController(res, 202, 'data role berhasil diperbarui', updateData);
    // res.status(202).json({
    //   success: true,
    //   message: 'role has updated',
    //   updateData,
    // });
  } catch (err) {
    next(err);
  }
}

async function deleteRole(req, res, next) {
  try {
    const { id } = req.params,
      roleIDExist = await check_role(id);
    if (!roleIDExist) throw new CustomError(404, 'role tidak ditemukan!');
    const deleteData = await delete_data(id);
    resSuccessController(res, 202, 'data role berhasil dihapus', deleteData);
    // res.status(202).json({
    //   success: true,
    //   message: 'role has deleted',
    //   deleteData,
    // });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
