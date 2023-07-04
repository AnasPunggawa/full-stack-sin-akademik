import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminGuru from './components/admin/AdminGuru';

function Guru() {
  useTitle('Guru');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return <>{user.role === 'admin' ? <AdminGuru /> : <h1>Akses Dilarang</h1>}</>;
}

export default Guru;
