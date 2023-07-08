import PropTypes from 'prop-types';

function BoxError({ children }) {
  return (
    <div
      className="bg-red-200/25 border border-red-400 text-red-700 px-4 py-3 rounded-md relative"
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
