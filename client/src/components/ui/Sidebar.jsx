import jwtDecode from 'jwt-decode';
// import { useSidebarContext } from '../../../hooks/useSidebarContext';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import AdminNavigation from '../admin/AdminNavigation';
import GuruNavigation from '../guru/GuruNavigation';
import SiswaNavigation from '../siswa/SiswaNavigation';

// function Sidebar({ Navigation }) {
function Sidebar() {
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);
  const { isOpen } = useSidebarContext();
  return (
    <>
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
          {user?.role === 'admin' && <AdminNavigation />}
          {user?.role === 'siswa' && <SiswaNavigation />}
          {user?.role === 'guru' && <GuruNavigation />}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
