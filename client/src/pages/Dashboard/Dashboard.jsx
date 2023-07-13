import jwtDecode from 'jwt-decode';
import { useTitle } from '../../hooks/useTitle';
import AdminDashboard from './components/admin/AdminDashboard';
import GuruDashboard from './components/guru/GuruDashboard';
import SiswaDashboard from './components/siswa/SiswaDashboard';

function Dashboard() {
  useTitle('Dashboard');
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);

  return (
    <>
      {user.role === 'admin' && <AdminDashboard User_id={user?.id} />}
      {user.role === 'guru' && <GuruDashboard User_id={user?.id} />}
      {user.role === 'siswa' && <SiswaDashboard User_id={user?.id} />}
    </>
  );
}

export default Dashboard;
