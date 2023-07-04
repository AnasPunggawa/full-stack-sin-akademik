import PropTypes from 'prop-types';

function Checkbox({
  Label = 'Label',
  Id = 'Label',
  Value = false,
  OnChange = () => {},
}) {
  return (
    <div className="flex items-center">
      <input
        id={Id}
        type="checkbox"
        onChange={OnChange}
        value={Value}
        checked={Value}
        className="w-4 h-4 rounded accent-blue-600 focus:ring-2 focus:ring-blue-500 text-blue-500"
      />
      <label
        htmlFor={Id}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {Label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  Label: PropTypes.string,
  Id: PropTypes.string,
  Value: PropTypes.bool,
  OnChange: PropTypes.func,
};

export default Checkbox;
