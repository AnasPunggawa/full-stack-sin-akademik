import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminCetakNilai from './components/admin/AdminCetakNilai';
import GuruCetakNilai from './components/guru/GuruCetakNilai';
import SiswaCetakNilai from './components/siswa/SiswaCetakNilai';

function CetakNilai() {
  useTitle('Cetak Nilai');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>
      {user?.role === 'admin' && <AdminCetakNilai />}
      {user?.role === 'guru' && <GuruCetakNilai />}
      {user?.role === 'siswa' && <SiswaCetakNilai />}
    </>
  );
}

export default CetakNilai;
