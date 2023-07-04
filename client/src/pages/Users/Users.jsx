import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminUsers from './components/admin/AdminUsers';

function Users() {
  useTitle('Users');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>{user.role === 'admin' ? <AdminUsers /> : <h1>Akses Dilarang</h1>}</>
  );
}

export default Users;
