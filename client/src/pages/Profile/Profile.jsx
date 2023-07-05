import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminProfile from './components/admin/AdminProfile';
import GuruProfile from './components/guru/GuruProfile';
import SiswaProfile from './components/siswa/SiswaProfile';

function Profile() {
  useTitle('Profile');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>
      {user.role === 'admin' && <AdminProfile />}
      {user.role === 'guru' && <GuruProfile />}
      {user.role === 'siswa' && <SiswaProfile />}
    </>
  );
}

export default Profile;
