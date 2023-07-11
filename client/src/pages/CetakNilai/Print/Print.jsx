import jwtDecode from 'jwt-decode';
import { useTitle } from '../../../hooks/useTitle';
import AdminPrint from './components/admin/AdminPrint';
import GuruPrint from './components/guru/GuruPrint';
import SiswaPrint from './components/siswa/SiswaPrint';

function Print() {
  useTitle('Print');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>
      {user?.role === 'admin' && <AdminPrint />}
      {user?.role === 'guru' && <GuruPrint />}
      {user?.role === 'siswa' && <SiswaPrint />}
    </>
  );
}

export default Print;
