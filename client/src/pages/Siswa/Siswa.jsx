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
      <h1 className="text-2xl font-bold">Siswa Public</h1>
    </>
  );
}

export default Siswa;
