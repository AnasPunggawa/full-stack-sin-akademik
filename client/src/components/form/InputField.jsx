import PropTypes from 'prop-types';

const AUTO_COMPLETE = {
  ON: 'on',
  OFF: 'off',
  NEW_PASSWORD: 'new-password',
  CURRENT_PASSWORD: 'current-password',
};

function InputField({
  children,
  HtmlFor = 'InputField',
  Type = 'text',
  Value = 'InputField',
  OnChange = () => {},
  Placeholder = 'Input Field',
  Required = true,
  Disabled = false,
  AutoComplete = 'ON',
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={HtmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {children}
      </label>
      <input
        type={Type}
        name={HtmlFor}
        id={HtmlFor}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={Value}
        onChange={OnChange}
        placeholder={Placeholder}
        required={Required}
        disabled={Disabled}
        autoComplete={AUTO_COMPLETE[AutoComplete]}
      />
    </div>
  );
}

InputField.propTypes = {
  children: PropTypes.any,
  HtmlFor: PropTypes.string,
  Type: PropTypes.string,
  Value: PropTypes.string,
  Ref: PropTypes.object,
  OnChange: PropTypes.func,
  Placeholder: PropTypes.string,
  Required: PropTypes.bool,
  Disabled: PropTypes.bool,
  AutoComplete: PropTypes.string,
};

export default InputField;
