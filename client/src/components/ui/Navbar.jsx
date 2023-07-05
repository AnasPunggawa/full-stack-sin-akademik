import PropTypes from 'prop-types';
import LogoSekolah from '../../assets/images/logo-smpn1-binamu.webp';
import { IconMenu, IconXMark } from './Icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import { authLogout } from '../../api/auth';
import { ACTION_AUTH_REDUCER_CONTEXT } from '../../reducer/authReducerContext';
import Button from './Button';

function Navbar() {
  const { user, dispatch } = useAuthContext();
  const { isOpen, toggle } = useSidebarContext();

  const navigate = useNavigate();

  async function handleLogout() {
    console.log(ACTION_AUTH_REDUCER_CONTEXT.LOGOUT);
    await authLogout();
    localStorage.clear();
    dispatch({ type: ACTION_AUTH_REDUCER_CONTEXT.LOGOUT });
    navigate('/login');
  }

  function home() {
    navigate('/');
    return;
  }

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gray-100 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggle}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="mr-1 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                // className="mr-1 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                {isOpen ? <IconXMark /> : <IconMenu />}
              </button>
              <Link
                to="/"
                className="flex ml-2 md:mr-24"
                onClick={isOpen ? toggle : home}
              >
                <img
                  src={LogoSekolah}
                  className="h-8 mr-3"
                  alt="Logo UPT SMP Negeri 1 Binamu"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  SIN Akademik
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3 gap-5">
                <h1 className="hidden md:block text-lg font-semibold  dark:text-white">
                  {/* {Role} */}
                  {user?.role}
                </h1>
                <Button Type="button" OnClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  Role: PropTypes.string,
};

export default Navbar;
