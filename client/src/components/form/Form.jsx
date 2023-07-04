import PropTypes from 'prop-types';

function Form({ children, OnSubmit = () => {} }) {
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={OnSubmit}>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.any,
  OnSubmit: PropTypes.func,
};

export default Form;
