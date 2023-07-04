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
      <h1 className="text-2xl font-bold">Profile Public</h1>
    </>
  );
}

export default Profile;
