// PACKAGE
const siswaRoutes = require('express').Router();

// CONTROLLERS
const {
  getAllSiswa,
  createSiswa,
  deleteSiswa,
  updateSiswa,
  getSiswa,
} = require('../controllers/siswa/siswa.controllers');
const { validateSiswa } = require('../middlewares/validator.middlewares');

// siswaRoutes.route('/').get(getAllSiswa).post(validateSiswa, createSiswa);
siswaRoutes.route('/').get(getAllSiswa).post(createSiswa);
siswaRoutes
  .route('/:id')
  .get(getSiswa)
  // .put(validateSiswa, updateSiswa)
  .put(updateSiswa)
  .delete(deleteSiswa);

module.exports = siswaRoutes;
