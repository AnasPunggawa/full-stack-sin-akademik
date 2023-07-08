import PropTypes from 'prop-types';

function LayoutSuccessMessage({ children }) {
  return (
    <div className="w-full h-full p-4 text-green-500">
      <h2 className="text-base md:text-lg font-semibold">{children}</h2>
    </div>
  );
}

LayoutSuccessMessage.propTypes = {
  children: PropTypes.any,
};

export default LayoutSuccessMessage;
