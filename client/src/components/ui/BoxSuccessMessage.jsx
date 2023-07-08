import PropTypes from 'prop-types';

function BoxSuccessMessage({ children }) {
  return (
    <div
      className="bg-green-200/25 border border-green-400 px-4 py-3 rounded-md relative"
      role="alert"
    >
      {children}
    </div>
  );
}

BoxSuccessMessage.propTypes = {
  children: PropTypes.any,
};

export default BoxSuccessMessage;
