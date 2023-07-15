const CustomError = require('../../utils/CustomError');
const resSuccessController = require('../../utils/resSuccessController');
const {
  createSekolahIdentitasValidation,
  updateSekolahIdentitasValidation,
} = require('../../validation/sekolahIdentitasValidation');
const {
  createSekolahKontakValidation,
  updateSekolahKontakValidation,
} = require('../../validation/sekolahKontakValidation');
const {
  createSekolahProfilValidation,
  updateSekolahProfilValidation,
} = require('../../validation/sekolahProfilValidation');
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
  find_profil_sekolah,
  find_identitas_sekolah,
  find_kontak_sekolah,
  create_data_profil_sekolah,
  create_data_identitas_sekolah,
  create_data_kontak_sekolah,
  update_data_profil_sekolah,
  update_data_identitas_sekolah,
  update_data_kontak_sekolah,
} = require('./repository');

async function getDashboardByRole(req, res, next) {
  try {
    const { user_id: id, npsn } = req.query,
      userExist = await check_user_id(id);
    if (!userExist)
      throw new CustomError(404, 'data pengguna tidak ditemukan!');
    const roleUser = userExist.role.toLowerCase();
    let dataUser = await find_single_data(id);
    if (roleUser === 'admin')
      dataUser = await find_details_single_data_admin(id);
    if (roleUser === 'guru') dataUser = await find_details_single_data_guru(id);
    if (roleUser === 'siswa')
      dataUser = await find_details_single_data_siswa(id);
    const profilSekolah = await find_profil_sekolah(npsn);
    // if (!profilSekolah)
    //   throw new CustomError(404, 'data profile sekolah tidak ditemukan!');
    const identitasSekolah = await find_identitas_sekolah(npsn);
    // if (!identitasSekolah)
    //   throw new CustomError(404, 'data identitas sekolah tidak ditemukan!');
    const kontakSekolah = await find_kontak_sekolah(npsn);
    // if (!kontakSekolah)
    //   throw new CustomError(404, 'data kontak sekolah tidak ditemukan!');
    const countGuruAktif = await count_all_guru_aktif(),
      countSiswaAktif = await count_all_siswa_aktif(),
      countKelas = await count_all_kelas(),
      countMatapelajaran = await count_all_matapelajaran();
    const data = {
      data_user: dataUser,
      data_count: {
        count_guru_aktif: countGuruAktif || 0,
        count_siswa_aktif: countSiswaAktif || 0,
        count_kelas: countKelas || 0,
        count_matapelajaran: countMatapelajaran || 0,
      },
      informasi_sekolah: {
        profil_sekolah: profilSekolah || null,
        identitas_sekolah: identitasSekolah || null,
        kontak_sekolah: kontakSekolah || null,
      },
    };
    resSuccessController(res, 200, 'data dashboard berhasil ditemukan', data);
  } catch (error) {
    next(error);
  }
}

async function getProfilSekolah(req, res, next) {
  try {
    const { id: npsn } = req.params;
    const data = await find_profil_sekolah(npsn);
    if (!data)
      throw new CustomError(404, 'data profil sekolah tidak ditemukan!');
    resSuccessController(
      res,
      200,
      'data profil sekolah berhasil ditemukan',
      data
    );
  } catch (error) {
    next(error);
  }
}

async function createProfilSekolah(req, res, next) {
  try {
    const profilSekolahData = await createSekolahProfilValidation(req);
    const profilSekolahExist = await find_profil_sekolah(
      profilSekolahData.npsn
    );
    if (profilSekolahExist)
      throw new CustomError(
        409,
        `NPSN ${profilSekolahData.npsn} telah digunakan`
      );
    const createData = await create_data_profil_sekolah(profilSekolahData);
    resSuccessController(
      res,
      200,
      'data profil sekolah berhasil dibuat',
      createData
    );
  } catch (error) {
    next(error);
  }
}

async function updateProfilSekolah(req, res, next) {
  try {
    const { id } = req.params,
      profilSekolahData = await updateSekolahProfilValidation(req);
    const profilSekolahExist = await find_profil_sekolah(id);
    if (!profilSekolahExist)
      throw new CustomError(404, 'data profile sekolah tidak ditemukan!');
    const updateData = await update_data_profil_sekolah(id, profilSekolahData);
    resSuccessController(
      res,
      200,
      'data profil sekolah berhasil diperbarui',
      updateData
    );
  } catch (error) {
    next(error);
  }
}

async function getIdentitasSekolah(req, res, next) {
  try {
    const { id: npsn } = req.params;
    const data = await find_identitas_sekolah(npsn);
    if (!data)
      throw new CustomError(404, 'data identitas sekolah tidak ditemukan!');
    resSuccessController(
      res,
      200,
      'data identitas sekolah berhasil ditemukan',
      data
    );
  } catch (error) {
    next(error);
  }
}

async function createIdentitasSekolah(req, res, next) {
  try {
    const identitasSekolahData = await createSekolahIdentitasValidation(req);
    const identitasSekolahExist = await find_identitas_sekolah(
      identitasSekolahData.npsn
    );
    if (identitasSekolahExist)
      throw new CustomError(
        409,
        `NPSN ${identitasSekolahData.npsn} telah digunakan`
      );
    const createData = await create_data_identitas_sekolah(
      identitasSekolahData
    );
    resSuccessController(
      res,
      200,
      'data identitas sekolah berhasil dibuat',
      createData
    );
  } catch (error) {
    next(error);
  }
}

async function updateIdentitasSekolah(req, res, next) {
  try {
    const { id } = req.params,
      identitasSekolahData = await updateSekolahIdentitasValidation(req);
    const identitasSekolahExist = await find_identitas_sekolah(id);
    if (!identitasSekolahExist)
      throw new CustomError(404, 'data identitas sekolah tidak ditemukan!');
    const updateData = await update_data_identitas_sekolah(
      id,
      identitasSekolahData
    );
    resSuccessController(
      res,
      200,
      'data identitas sekolah berhasil diperbarui',
      updateData
    );
  } catch (error) {
    next(error);
  }
}

async function getKontakSekolah(req, res, next) {
  try {
    const { id: npsn } = req.params;
    const data = await find_kontak_sekolah(npsn);
    if (!data)
      throw new CustomError(404, 'data kontak sekolah tidak ditemukan!');
    resSuccessController(
      res,
      200,
      'data kontak sekolah berhasil ditemukan',
      data
    );
  } catch (error) {
    next(error);
  }
}

async function createKontakSekolah(req, res, next) {
  try {
    const kontakSekolahData = await createSekolahKontakValidation(req);
    const kontakSekolahExist = await find_kontak_sekolah(
      kontakSekolahData.npsn
    );
    if (kontakSekolahExist)
      throw new CustomError(
        409,
        `NPSN ${kontakSekolahData.npsn} telah digunakan`
      );
    const createData = await create_data_kontak_sekolah(kontakSekolahData);
    resSuccessController(
      res,
      200,
      'data kontak sekolah berhasil dibuat',
      createData
    );
  } catch (error) {
    next(error);
  }
}

async function updateKontakSekolah(req, res, next) {
  try {
    const { id } = req.params,
      kontakSekolahData = await updateSekolahKontakValidation(req);
    const kontakSekolahExist = await find_kontak_sekolah(id);
    if (!kontakSekolahExist)
      throw new CustomError(404, 'data kontak sekolah tidak ditemukan!');
    const updateData = await update_data_kontak_sekolah(id, kontakSekolahData);
    resSuccessController(
      res,
      200,
      'data kontak sekolah berhasil diperbarui',
      updateData
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDashboardByRole,
  getProfilSekolah,
  createProfilSekolah,
  updateProfilSekolah,
  getIdentitasSekolah,
  createIdentitasSekolah,
  updateIdentitasSekolah,
  getKontakSekolah,
  createKontakSekolah,
  updateKontakSekolah,
};
