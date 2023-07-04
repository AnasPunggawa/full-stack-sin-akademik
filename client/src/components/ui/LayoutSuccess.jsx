import PropTypes from 'prop-types';

function LayoutSuccess({ children }) {
  return <div className="w-full h-full">{children}</div>;
}

LayoutSuccess.propTypes = {
  children: PropTypes.any,
};

export default LayoutSuccess;
