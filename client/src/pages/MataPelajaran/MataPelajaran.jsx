import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminMataPelajaran from './components/admin/AdminMataPelajaran';

function MataPelajaran() {
  useTitle('Mata Pelajaran');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>
      {user.role === 'admin' ? <AdminMataPelajaran /> : <h1>Akses Dilarang</h1>}
    </>
  );
}

export default MataPelajaran;
