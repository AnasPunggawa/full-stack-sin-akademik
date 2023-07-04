// PACKAGE
const adminRoutes = require('express').Router();
// CONTROLLERS
const {
  getAllAdmin,
  createAdmin,
  updateAdmin,
  getAdmin,
  deleteAdmin,
} = require('../controllers/admin/admin.controllers');
const { validateAdmin } = require('../middlewares/validator.middlewares');

// adminRoutes.route('/').get(getAllAdmin).post(validateAdmin, createAdmin);
adminRoutes.route('/').get(getAllAdmin).post(createAdmin);
adminRoutes
  .route('/:id')
  .get(getAdmin)
  .put(updateAdmin)
  // .put(validateAdmin, updateAdmin)
  .delete(deleteAdmin);

module.exports = adminRoutes;
