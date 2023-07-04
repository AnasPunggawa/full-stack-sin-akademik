import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminSemester from './components/admin/AdminSemester';

function Semester() {
  useTitle('Semester');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>{user.role === 'admin' ? <AdminSemester /> : <h1>Akses Dilarang</h1>}</>
  );
}

export default Semester;
