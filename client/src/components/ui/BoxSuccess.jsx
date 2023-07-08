import PropTypes from 'prop-types';

function BoxSuccess({ children }) {
  return (
    <div
      className="relative w-full px-4 py-3 text-green-700 bg-green-200/25 dark:bg-green-200/60 border border-green-400 rounded-md"
      role="alert"
    >
      {children}
    </div>
  );
}

BoxSuccess.propTypes = {
  children: PropTypes.any,
};

export default BoxSuccess;
