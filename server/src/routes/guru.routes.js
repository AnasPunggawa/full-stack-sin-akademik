// CONTROLLERS
const {
  getAllGuru,
  getGuru,
  createGuru,
  deleteGuru,
  updateGuru,
} = require('../controllers/guru/guru.controllers');

// VALIDATOR
const { validateGuru } = require('../middlewares/validator.middlewares');

// PACKAGE
const guruRoutes = require('express').Router();

// guruRoutes.route('/').get(getAllGuru).post(validateGuru, createGuru);
guruRoutes.route('/').get(getAllGuru).post(createGuru);
guruRoutes
  .route('/:id')
  .get(getGuru)
  // .put(validateGuru, updateGuru)
  .put(updateGuru)
  .delete(deleteGuru);

module.exports = guruRoutes;
