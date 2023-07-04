import PropTypes from 'prop-types';
import { IconSeacrh } from '../ui/Icons';
import Button from '../ui/Button';

function InputSearch({
  Placeholder = 'Search...',
  Value = '',
  OnChange = () => {},
}) {
  return (
    <>
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="flex items-center justify-end gap-2 w-fit">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
            <IconSeacrh />
          </div>
          <input
            type="text"
            id="table-search"
            name="table-search"
            placeholder={Placeholder}
            value={Value}
            onChange={OnChange}
            className="block p-2 pl-10 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <Button Type="submit" ButtonStyle="SECONDARY">
          Cari
        </Button>
      </div>
    </>
  );
}

InputSearch.propTypes = {
  Placeholder: PropTypes.string,
  OnChange: PropTypes.func,
  Value: PropTypes.string,
};

export default InputSearch;
