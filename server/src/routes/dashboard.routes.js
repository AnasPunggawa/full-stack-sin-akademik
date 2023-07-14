// PACKAGE
const dashboardRoutes = require('express').Router();
// CONTROLLERS
const {
  getDashboardByRole,
  createProfilSekolah,
  createIdentitasSekolah,
  createKontakSekolah,
  getProfilSekolah,
  updateProfilSekolah,
  updateIdentitasSekolah,
  getIdentitasSekolah,
  updateKontakSekolah,
  getKontakSekolah,
} = require('../controllers/dashboard/dashboard.controllers');
// VALIDATION

// dashboardRoutes.route('/:id').get(getDashboardByRole);
//? GET DATA DASHBOARD
dashboardRoutes.route('/').get(getDashboardByRole);

//? PROFIL SEKOLAH
dashboardRoutes.route('/profil').post(createProfilSekolah);
dashboardRoutes
  .route('/profil/:id')
  .get(getProfilSekolah)
  .put(updateProfilSekolah);

//? IDENTITAS SEKOLAH
dashboardRoutes.route('/identitas').post(createIdentitasSekolah);
dashboardRoutes
  .route('/identitas/:id')
  .get(getIdentitasSekolah)
  .put(updateIdentitasSekolah);

//? KONTAK SEKOLAH
dashboardRoutes.route('/kontak').post(createKontakSekolah);
dashboardRoutes
  .route('/kontak/:id')
  .get(getKontakSekolah)
  .put(updateKontakSekolah);

// dashboardRoutes.route('/').get(getAllUsers).post(createUser);
// dashboardRoutes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
// dashboardRoutes.route('/roles/:role').get(getUsersByRoles);

module.exports = dashboardRoutes;
