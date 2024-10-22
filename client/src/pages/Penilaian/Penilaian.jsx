import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import GuruPenilaian from './components/guru/GuruPenilaian';

function Penilaian() {
  useTitle('Penilaian');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>{user.role === 'guru' ? <GuruPenilaian /> : <h1>Akses Dilarang</h1>}</>
  );
}

export default Penilaian;
