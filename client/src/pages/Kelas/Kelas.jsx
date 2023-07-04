import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminKelas from './components/admin/AdminKelas';

function Kelas() {
  useTitle('Kelas');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>{user?.role === 'admin' ? <AdminKelas /> : <h1>Akses Dilarang</h1>}</>
  );
}

export default Kelas;
