// PACKAGE
const usersRoutes = require('express').Router();
// CONTROLLERS
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUsersByRoles,
} = require('../controllers/users/users.controllers');
// VALIDATION
const { validateUsers } = require('../middlewares/validator.middlewares');

usersRoutes.route('/').get(getAllUsers).post(createUser);
usersRoutes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
usersRoutes.route('/roles/:role').get(getUsersByRoles);

module.exports = usersRoutes;
