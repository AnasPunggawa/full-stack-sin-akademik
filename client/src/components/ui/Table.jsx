import PropTypes from 'prop-types';

function Table({ TableHead, TableBody }) {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200"></thead>
      <tbody></tbody>
    </table>
  );
}

Table.propTypes = {
  TableHead: PropTypes.array,
  TableBody: PropTypes.array,
};

export default Table;
