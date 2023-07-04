import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminSiswa from './components/admin/AdminSiswa';
import GuruSiswa from './components/guru/GuruSiswa';

function Siswa() {
  useTitle('Siswa');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>
      {user.role === 'admin' && <AdminSiswa />}
      {user.role === 'guru' && <GuruSiswa />}
    </>
  );
}

export default Siswa;
