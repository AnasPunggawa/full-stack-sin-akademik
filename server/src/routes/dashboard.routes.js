// PACKAGE
const dashboardRoutes = require('express').Router();
// CONTROLLERS
const {
  getDashboardByRole,
} = require('../controllers/dashboard/dashboard.controllers');
// VALIDATION

// dashboardRoutes.route('/:id').get(getDashboardByRole);
dashboardRoutes.route('/').get(getDashboardByRole);
// dashboardRoutes.route('/').get(getAllUsers).post(createUser);
// dashboardRoutes.route('/:id').get(getUser).put(updateUser).delete(deleteUser);
// dashboardRoutes.route('/roles/:role').get(getUsersByRoles);

module.exports = dashboardRoutes;
