import PropTypes from 'prop-types';

function Header({ children }) {
  return (
    <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
      {children}
    </h1>
  );
}

Header.propTypes = {
  children: PropTypes.any,
};

export default Header;
