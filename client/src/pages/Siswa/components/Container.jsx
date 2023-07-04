import PropTypes from 'prop-types';

function Container({ children }) {
  return (
    <div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-600">
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.any,
};

export default Container;
