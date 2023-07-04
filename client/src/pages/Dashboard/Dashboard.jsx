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
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'guru' && <GuruDashboard />}
      {user.role === 'siswa' && <SiswaDashboard />}
      <h1 className="text-2xl font-bold">Dashboard Public</h1>
    </>
  );
}

export default Dashboard;
