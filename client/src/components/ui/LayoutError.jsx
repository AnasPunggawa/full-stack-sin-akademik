import PropTypes from 'prop-types';

function LayoutError({ children }) {
  return (
    <div className="w-full h-full p-4 text-red-500">
      <h2 className="text-base md:text-lg font-semibold">{children}</h2>
    </div>
  );
}

LayoutError.propTypes = {
  children: PropTypes.any,
};

export default LayoutError;
