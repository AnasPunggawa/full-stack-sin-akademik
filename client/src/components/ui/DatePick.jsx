import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
function DatePick({
  children,
  HtmlFor,
  Value,
  Placeholder = 'tanggal/bulan/tahun',
  Required = true,
  Disabled = false,
  OnChange,
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
        <DatePicker
          id={HtmlFor}
          name={HtmlFor}
          placeholderText={Placeholder}
          selected={Value}
          onChange={(date) => OnChange(date)}
          required={Required}
          disabled={Disabled}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          wrapperClassName="w-full"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          // isClearable
          closeOnScroll={true}
        />
      </div>
    </>
  );
}

DatePick.propTypes = {
  children: PropTypes.any,
  HtmlFor: PropTypes.string,
  Value: PropTypes.any,
  OnChange: PropTypes.func,
  Placeholder: PropTypes.string,
  Required: PropTypes.bool,
  Disabled: PropTypes.bool,
};

export default DatePick;
