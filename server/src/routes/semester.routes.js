const {
  getAllSemester,
  createSemester,
  deleteSemester,
  updateSemester,
  getSemester,
} = require('../controllers/semester/semester.controllers');
const { validateSemester } = require('../middlewares/validator.middlewares');

const semesterRoutes = require('express').Router();

semesterRoutes
  .route('/')
  .get(getAllSemester)
  // .post(validateSemester, createSemester);
  .post(createSemester);
semesterRoutes
  .route('/:id')
  .get(getSemester)
  // .put(validateSemester, updateSemester)
  .put(updateSemester)
  .delete(deleteSemester);

module.exports = semesterRoutes;
