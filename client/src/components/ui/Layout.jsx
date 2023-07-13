import { Outlet } from 'react-router-dom';
// import { SidebarProvider } from '../../context/SidebarContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSidebarContext } from '../../hooks/useSidebarContext';

function Layout() {
  const { isOpen } = useSidebarContext();
  return (
    <>
      {/* <SidebarProvider> */}
      <Navbar />
      <Sidebar />
      {/* <main className="min-h-screen p-4 sm:ml-64 text-gray-900 dark:text-white dark:bg-gray-700"> */}
      <main
        className={`${
          isOpen ? 'sm:ml-64' : ''
        } min-h-screen md:p-4 text-gray-900 dark:text-white dark:bg-gray-700 transition-all`}
      >
        <div className="p-4 mt-14">
          <Outlet />
        </div>
      </main>
      {/* </SidebarProvider> */}
    </>
  );
}

export default Layout;
