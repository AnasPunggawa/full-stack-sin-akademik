import PropTypes from 'prop-types';

function RadioButton({
  children,
  HtmlFor = 'radioButton',
  Name = 'RadioButton',
}) {
  return (
    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
      <input
        id={HtmlFor}
        type="radio"
        value={HtmlFor}
        name={Name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={HtmlFor}
        className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
      >
        {children}
      </label>
    </div>
  );
}

RadioButton.propTypes = {
  children: PropTypes.any,
  HtmlFor: PropTypes.string,
  Name: PropTypes.string,
};

export default RadioButton;
