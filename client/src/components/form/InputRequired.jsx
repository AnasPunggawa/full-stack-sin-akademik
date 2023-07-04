import PropTypes from 'prop-types';

function InputRequired({ children }) {
  return <span className="text-red-500">* {children}</span>;
}

InputRequired.propTypes = {
  children: PropTypes.any,
};

export default InputRequired;
