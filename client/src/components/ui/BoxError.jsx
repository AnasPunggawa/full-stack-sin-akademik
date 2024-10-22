import PropTypes from 'prop-types';

function BoxError({ children }) {
  return (
    <div
      className="relative w-full flex items-center px-4 py-3 text-red-700 bg-red-200/25 dark:bg-red-200/60 border border-red-400 rounded-md"
      role="alert"
    >
      {children}
    </div>
  );
}

BoxError.propTypes = {
  children: PropTypes.any,
};

export default BoxError;
