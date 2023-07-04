import PropTypes from 'prop-types';

const TABLE_HEAD_DETAIL_MATAPELAJARAN = [
  {
    name: 'No',
    style: 'px-6 py-3 w-1/6',
  },
  {
    name: 'NIP',
    style: 'px-6 py-3 w-2/6',
  },
  {
    name: 'Nama Guru',
    style: 'px-6 py-3 w-3/6',
  },
];

function TableDataGuru({ DataGuru }) {
  return (
    <div className="relative overflow-x-auto rounded-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
          <tr>
            {TABLE_HEAD_DETAIL_MATAPELAJARAN.map((item, index) => {
              return (
                <th key={index} className={item.style}>
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {DataGuru &&
            DataGuru?.map((item, index) => {
              return (
                <tr
                  key={item?.id}
                  className="bg-white border-b dark:bg-gray-700 dark:border-gray-800 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  <td className="px-6 py-2.5">{index + 1}</td>
                  <td className="px-6 py-2.5">{item?.nip}</td>
                  <td className="px-6 py-2.5">{item?.nama}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

TableDataGuru.propTypes = {
  DataGuru: PropTypes.array,
};

export default TableDataGuru;
