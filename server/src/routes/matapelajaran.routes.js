const {
  getAllMatapelajaran,
  createMatapelajaran,
  deleteMatapelajaran,
  updateMatapelajaran,
  getMatapelajaran,
} = require('../controllers/matapelajaran/matapelajaran.controllers');
const {
  validateMatapelajaran,
} = require('../middlewares/validator.middlewares');

const matapelajaranRoutes = require('express').Router();

matapelajaranRoutes
  .route('/')
  .get(getAllMatapelajaran)
  // .post(validateMatapelajaran, createMatapelajaran);
  .post(createMatapelajaran);
matapelajaranRoutes
  .route('/:id')
  .get(getMatapelajaran)
  // .put(validateMatapelajaran, updateMatapelajaran)
  .put(updateMatapelajaran)
  .delete(deleteMatapelajaran);

module.exports = matapelajaranRoutes;
