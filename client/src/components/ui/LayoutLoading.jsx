import PropTypes from 'prop-types';

function LayoutLoading({ children }) {
  return (
    <div className="w-full h-full p-4 text-gray-800 dark:text-gray-100">
      <h2 className="text-base md:text-lg font-semibold">{children}</h2>
    </div>
  );
}

LayoutLoading.propTypes = {
  children: PropTypes.any,
};

export default LayoutLoading;
