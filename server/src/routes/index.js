const routes = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken.middlewares');
const adminRoutes = require('./admin.routes');
const authRoutes = require('./auth.routes');
const dashboardRoutes = require('./dashboard.routes');
const guruRoutes = require('./guru.routes');
const kelasRoutes = require('./kelas.routes');
const matapelajaranRoutes = require('./matapelajaran.routes');
const nilaiRoutes = require('./nilai.routes');
const rolesRoutes = require('./roles.routes');
const semesterRoutes = require('./semester.routes');
const siswaRoutes = require('./siswa.routes');
const usersRoutes = require('./users.routes');

routes.use('/auth', authRoutes);

routes.use(verifyToken);
routes
  .use('/role', rolesRoutes)
  .use('/user', usersRoutes)
  .use('/admin', adminRoutes)
  .use('/guru', guruRoutes)
  .use('/siswa', siswaRoutes)
  .use('/dashboard', dashboardRoutes)
  .use('/semester', semesterRoutes)
  .use('/kelas', kelasRoutes)
  .use('/matapelajaran', matapelajaranRoutes)
  .use('/nilai', nilaiRoutes);

module.exports = routes;
