const rolesRoutes = require('express').Router();
// CONTROLLERS
const {
  getAllRoles,
  createRole,
  getRole,
  deleteRole,
  updateRole,
} = require('../controllers/roles/roles.controllers');
// VALIDATIONS
const { validateRoles } = require('../middlewares/validator.middlewares');

rolesRoutes.route('/').get(getAllRoles).post(createRole);
rolesRoutes.route('/:id').get(getRole).put(updateRole).delete(deleteRole);

module.exports = rolesRoutes;
