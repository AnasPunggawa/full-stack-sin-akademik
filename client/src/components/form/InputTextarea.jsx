import PropTypes from 'prop-types';

function InputTextarea({
  children,
  HtmlFor = 'InputField',
  Placeholder = 'Input Field',
  Required = true,
  Disabled = false,
  Rows = '4',
  Cols = '50',
  Value = 'InputField',
  OnChange = () => {},
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={HtmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {children}
      </label>
      <textarea
        id={HtmlFor}
        rows={Rows}
        cols={Cols}
        value={Value}
        onChange={OnChange}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={Placeholder}
        required={Required}
        disabled={Disabled}
      ></textarea>
    </div>
  );
}

InputTextarea.propTypes = {
  children: PropTypes.any,
  HtmlFor: PropTypes.string,
  Value: PropTypes.string,
  OnChange: PropTypes.func,
  Placeholder: PropTypes.string,
  Rows: PropTypes.string,
  Cols: PropTypes.string,
  Required: PropTypes.bool,
  Disabled: PropTypes.bool,
};

export default InputTextarea;
