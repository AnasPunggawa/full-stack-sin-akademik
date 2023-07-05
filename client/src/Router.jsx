import { Route, Routes } from 'react-router-dom';
import Layout from './components/ui/Layout';
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
import NewUser from './pages/Users/NewUser/NewUser';
import NewMataPelajaran from './pages/MataPelajaran/NewMataPelajaran/NewMataPelajaran';
import DetailMataPelajaran from './pages/MataPelajaran/DetailMataPelajaran/DetailMataPelajaran';
import EditMataPelajaran from './pages/MataPelajaran/DetailMataPelajaran/EditMataPelajaran/EditMataPelajaran';
import NewKelas from './pages/Kelas/NewKelas/NewKelas';
import NewSemester from './pages/Semester/NewSemester/NewSemester';
import DetailSemester from './pages/Semester/DetailSemester/DetailSemester';
import EditSemester from './pages/Semester/DetailSemester/EditSemester/EditSemester';
import NewGuru from './pages/Guru/NewGuru/NewGuru';
import DetailGuru from './pages/Guru/DetailGuru/DetailGuru';
import EditBiodataGuru from './pages/Guru/DetailGuru/EditBiodataGuru/EditBiodataGuru';
import EditAkunGuru from './pages/Guru/DetailGuru/EditAkunGuru/EditAkunGuru';
import NewSiswa from './pages/Siswa/NewSiswa/NewSiswa';
import DetailSiswa from './pages/Siswa/DetailSiswa/DetailSiswa';
import EditBiodataSiswa from './pages/Siswa/DetailSiswa/EditBiodataSiswa/EditBiodataSiswa';
import EditAkunSiswa from './pages/Siswa/DetailSiswa/EditAkunSiswa/EditAkunSiswa';
import EditBiodata from './pages/Profile/EditBiodata/EditBiodata';
import EditAkun from './pages/Profile/EditAkun/EditAkun';

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
            <Route path="profile">
              <Route index element={<Profile />} />
              <Route path="edit-biodata" element={<EditBiodata />} />
              <Route path="edit-akun" element={<EditAkun />} />
            </Route>
            <Route path="cetak-nilai" element={<CetakNilai />} />
            {/* ONLY ADMIN AND GURU CAN ACCESS */}
            <Route
              element={<PermissionRoutes Roles={[ROLES.ADMIN, ROLES.GURU]} />}
            >
              <Route path="siswa">
                <Route index element={<Siswa />} />
                <Route path=":id">
                  <Route index element={<DetailSiswa />} />
                  <Route element={<PermissionRoutes Roles={[ROLES.ADMIN]} />}>
                    <Route path="edit-biodata" element={<EditBiodataSiswa />} />
                    <Route path="edit-akun" element={<EditAkunSiswa />} />
                  </Route>
                </Route>
                <Route element={<PermissionRoutes Roles={[ROLES.ADMIN]} />}>
                  <Route path="new" element={<NewSiswa />} />
                </Route>
              </Route>
            </Route>
            {/* ONLY ADMIN CAN ACCESS */}
            <Route element={<PermissionRoutes Roles={[ROLES.ADMIN]} />}>
              <Route path="users">
                <Route index element={<Users />} />
                <Route path="new" element={<NewUser />} />
              </Route>
              <Route path="guru">
                <Route index element={<Guru />} />
                <Route path=":id">
                  <Route index element={<DetailGuru />} />
                  <Route path="edit-biodata" element={<EditBiodataGuru />} />
                  <Route path="edit-akun" element={<EditAkunGuru />} />
                </Route>
                <Route path="new" element={<NewGuru />} />
              </Route>
              <Route path="mata-pelajaran">
                <Route index element={<MataPelajaran />} />
                <Route path=":id">
                  <Route index element={<DetailMataPelajaran />} />
                  <Route path="edit" element={<EditMataPelajaran />} />
                </Route>
                <Route path="new" element={<NewMataPelajaran />} />
              </Route>
              <Route path="kelas">
                <Route index element={<Kelas />} />
                <Route path="new" element={<NewKelas />} />
              </Route>
              <Route path="semester">
                <Route index element={<Semester />} />
                <Route path=":id">
                  <Route index element={<DetailSemester />} />
                  <Route path="edit" element={<EditSemester />} />
                </Route>
                <Route path="new" element={<NewSemester />} />
              </Route>
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
