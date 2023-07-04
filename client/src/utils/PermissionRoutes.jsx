import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function PermissionRoutes({ Roles = [] }) {
  const accessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(accessToken);
  const location = useLocation();
  return accessToken && Roles.find((Role) => Role.includes(user?.role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

PermissionRoutes.propTypes = {
  Roles: PropTypes.array,
};

export default PermissionRoutes;
