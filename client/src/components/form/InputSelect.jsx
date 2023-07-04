import PropTypes from 'prop-types';

function InputSelect({
  children,
  HtmlFor,
  Value,
  Options,
  PlaceHolder,
  Required = true,
  Disabled = false,
  OnChange = () => {},
}) {
  return (
    <>
      <div className="w-full">
        <label
          htmlFor={HtmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {children}
        </label>
        <select
          id={HtmlFor}
          name={HtmlFor}
          title={HtmlFor}
          value={Value}
          onChange={OnChange}
          required={Required}
          disabled={Disabled}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" className="text-gray-900 dark:text-white">
            {PlaceHolder}
          </option>
          {Options.map((item) => (
            <option
              key={item.id}
              value={item.id}
              className="text-gray-900 dark:text-white"
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

InputSelect.propTypes = {
  children: PropTypes.any,
  HtmlFor: PropTypes.string,
  PlaceHolder: PropTypes.string,
  Options: PropTypes.array,
  Required: PropTypes.bool,
  Disabled: PropTypes.bool,
  Value: PropTypes.any,
  OnChange: PropTypes.func,
};

export default InputSelect;
