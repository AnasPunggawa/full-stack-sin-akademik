const {
  getAllKelas,
  createKelas,
  deleteKelas,
  updateKelas,
  getKelas,
} = require('../controllers/kelas/kelas.controllers');
const { validateKelas } = require('../middlewares/validator.middlewares');

const kelasRoutes = require('express').Router();

// kelasRoutes.route('/').get(getAllKelas).post(validateKelas, createKelas);
kelasRoutes.route('/').get(getAllKelas).post(createKelas);
kelasRoutes
  .route('/:id')
  .get(getKelas)
  // .put(validateKelas, updateKelas)
  .put(updateKelas)
  .delete(deleteKelas);

module.exports = kelasRoutes;
