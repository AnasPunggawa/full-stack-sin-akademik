import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import PermissionRoutes from './utils/PermissionRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import Guru from './pages/Guru/Guru';
import Siswa from './pages/Siswa/Siswa';
import MataPelajaran from './pages/MataPelajaran/MataPelajaran';
import Kelas from './pages/Kelas/Kelas';
import Semester from './pages/Semester/Semester';
import Penilaian from './pages/Penilaian/Penilaian';
import CetakNilai from './pages/CetakNilai/CetakNilai';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { ROLES } from './config/Roles';

function Router() {
  return (
    <Routes>
      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        {/* ONLY USER CAN ACCESS */}
        <Route
          element={
            <PermissionRoutes Roles={[ROLES.ADMIN, ROLES.GURU, ROLES.SISWA]} />
          }
        >
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cetak-nilai" element={<CetakNilai />} />
            {/* ONLY ADMIN AND GURU CAN ACCESS */}
            <Route
              element={<PermissionRoutes Roles={[ROLES.ADMIN, ROLES.GURU]} />}
            >
              <Route path="siswa" element={<Siswa />} />
            </Route>
            {/* ONLY ADMIN CAN ACCESS */}
            <Route element={<PermissionRoutes Roles={[ROLES.ADMIN]} />}>
              <Route path="users" element={<Users />} />
              <Route path="guru" element={<Guru />} />
              <Route path="mata-pelajaran" element={<MataPelajaran />} />
              <Route path="kelas" element={<Kelas />} />
              <Route path="semester" element={<Semester />} />
            </Route>
            {/* ONLY GURU CAN ACCESS */}
            <Route element={<PermissionRoutes Roles={[ROLES.GURU]} />}>
              <Route path="penilaian" element={<Penilaian />} />
            </Route>
          </Route>
        </Route>
      </Route>
      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
