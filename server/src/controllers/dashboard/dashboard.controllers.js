const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  check_user_id,
  find_single_data,
  find_details_single_data_admin,
  find_details_single_data_guru,
  find_details_single_data_siswa,
  count_all_guru_aktif,
  count_all_siswa_aktif,
  count_all_kelas,
  count_all_matapelajaran,
} = require('./repository');

async function getDashboardByRole(req, res, next) {
  try {
    const { user_id: id } = req.query,
      // const { id } = req.params,
      userExist = await check_user_id(id);
    if (!userExist)
      throw new CustomError(404, 'data pengguna tidak ditemukan!');
    const roleUser = userExist.role.toLowerCase();
    let data = await find_single_data(id);
    if (roleUser === 'admin') data = await find_details_single_data_admin(id);
    if (roleUser === 'guru') data = await find_details_single_data_guru(id);
    if (roleUser === 'siswa') data = await find_details_single_data_siswa(id);
    const countGuruAktif = await count_all_guru_aktif(),
      countSiswaAktif = await count_all_siswa_aktif(),
      countKelas = await count_all_kelas(),
      countMatapelajaran = await count_all_matapelajaran();
    resSuccessController(res, 200, 'data pengguna berhasil ditemukan', {
      data_user: data,
      data_count: {
        count_guru_aktif: countGuruAktif || 0,
        count_siswa_aktif: countSiswaAktif || 0,
        count_kelas: countKelas || 0,
        count_matapelajaran: countMatapelajaran || 0,
      },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboardByRole,
};
