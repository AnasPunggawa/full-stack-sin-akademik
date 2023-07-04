const {
  getAllNilai,
  createNilai,
  deleteNilai,
  updateNilai,
  getNilai,
} = require('../controllers/nilai/nilai.controllers');
const { validateNilai } = require('../middlewares/validator.middlewares');

const nilaiRoutes = require('express').Router();

// nilaiRoutes.route('/').get(getAllNilai).post(validateNilai, createNilai);
nilaiRoutes.route('/').get(getAllNilai).post(createNilai);
nilaiRoutes
  .route('/:id')
  .get(getNilai)
  // .put(validateNilai, updateNilai)
  .put(updateNilai)
  .delete(deleteNilai);

module.exports = nilaiRoutes;
