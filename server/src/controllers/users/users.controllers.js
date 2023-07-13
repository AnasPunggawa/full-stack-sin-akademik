const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createUserValidation,
  updateUserValidation,
} = require('../../validation/usersValidation');
const {
  find_all_datas,
  find_single_data,
  check_username,
  check_role,
  create_data,
  check_user_id,
  update_data,
  delete_data,
  find_details_single_data_admin,
  find_details_single_data_guru,
  find_details_single_data_siswa,
  find_datas_by_role,
  count_all_datas,
} = require('./repository');

async function getAllUsers(req, res, next) {
  try {
    const { role = '', searchUsername = '', page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const data = await find_all_datas(role, searchUsername, limit, skip);
    // const data = await prisma.users.findMany({
    //   take: Number(limit),
    //   skip: skip,
    //   where: {
    //     role: {
    //       contains: role,
    //     },
    //     username: {
    //       contains: searchUsername,
    //     },
    //   },
    //   orderBy: {
    //     username: 'asc',
    //   },
    // });
    const countData = await count_all_datas(role, searchUsername);
    // const countData = await prisma.users.count({
    //   where: {
    //     role: {
    //       contains: role,
    //     },
    //     username: {
    //       contains: searchUsername,
    //     },
    //   },
    // });
    const totalPage = Math.ceil(countData / Number(limit));
    if (!data || data.length === 0)
      throw new CustomError(404, 'data pengguna tidak ditemukan!');
    // resSuccessController(res, 200, 'data pengguna berhasil ditemukan', data);
    resSuccessController(res, 200, 'data pengguna berhasil ditemukan', {
      current_page: Number(page),
      total_page: totalPage,
      limit_data: Number(limit),
      total_data: countData,
      users: data,
    });
    // res.status(200).json({ success: true, message: 'users found', data });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const { id } = req.params,
      userExist = await check_user_id(id);
    if (!userExist)
      throw new CustomError(404, 'data pengguna tidak ditemukan!');
    const roleUser = userExist.role.toLowerCase();
    let data = await find_single_data(id);
    if (roleUser === 'admin') data = await find_details_single_data_admin(id);
    if (roleUser === 'guru') data = await find_details_single_data_guru(id);
    if (roleUser === 'siswa') data = await find_details_single_data_siswa(id);
    resSuccessController(res, 200, 'data pengguna berhasil ditemukan', data);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    // const userData = req.user;
    const userData = await createUserValidation(req),
      usernameExist = await check_username(userData.username),
      roleExist = await check_role(userData.role);
    if (usernameExist)
      throw new CustomError(
        409,
        `username ${userData.username} telah tersedia!`
      );
    if (!roleExist)
      throw new CustomError(404, `role ${userData.role} tidak ditemukan!`);
    const createData = await create_data(userData);
    resSuccessController(res, 201, 'data pengguna berhasil dibuat', createData);
    // res
    //   .status(201)
    //   .json({ success: true, message: 'user has created', createData });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params,
      // userData = req.user,
      userData = await updateUserValidation(req),
      userExist = await check_user_id(id),
      usernameExist = await check_username(userData.username),
      roleExist = await check_role(userData.role);
    if (!userExist) throw new CustomError(404, 'pengguna tidak ditemukan!');
    if (usernameExist && usernameExist.id !== id)
      throw new CustomError(
        409,
        `username ${userData.username} telah tersedia`
      );
    if (!roleExist)
      throw new CustomError(404, `role ${userData.role} tidak ditemukan`);
    const updateData = await update_data(id, userData);
    // res.status(202).json({
    //   updateData,
    // });
    resSuccessController(
      res,
      202,
      'data pengguna berhasil diperbarui',
      updateData
    );
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params,
      userExist = await check_user_id(id);
    if (!userExist)
      throw new CustomError(404, 'data pengguna tidak ditemukan!');
    const deleteData = await delete_data(id);
    resSuccessController(
      res,
      202,
      'data pengguna berhasil dihapus',
      deleteData
    );
    // res.status(202).json({
    //   success: true,
    //   message: 'user has deleted',
    //   deleteData,
    // });
  } catch (err) {
    next(err);
  }
}

async function getUsersByRoles(req, res, next) {
  try {
    const { role } = req.params,
      roleExist = await check_role(role);
    if (!roleExist) throw new CustomError(404, `role ${role} tidak ditemukan`);
    const data = await find_datas_by_role(role);
    resSuccessController(
      res,
      200,
      `data pengguna dengan role ${role} ditemukan`,
      data
    );
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUsersByRoles,
};
