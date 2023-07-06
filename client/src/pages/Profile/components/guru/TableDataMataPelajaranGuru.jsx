import PropTypes from 'prop-types';

const TABLE_HEAD_DETAIL_GURU = [
  {
    name: 'No',
    style: 'px-6 py-3 w-2/5',
  },
  {
    name: 'Mata Pelajaran',
    style: 'px-6 py-3 w-3/5',
  },
];

function TableDataMataPelajaranGuru({ DataMataPelajaranGuru }) {
  return (
    <div>
      <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2.5">
        Data Mata Pelajaran Guru
      </h3>
      <div className="relative overflow-x-auto rounded-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
            <tr>
              {TABLE_HEAD_DETAIL_GURU.map((item, index) => {
                return (
                  <th key={index} className={item.style}>
                    {item.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {DataMataPelajaranGuru &&
              DataMataPelajaranGuru?.map((item, index) => {
                return (
                  <tr
                    key={item?.id}
                    className="bg-white border-b dark:bg-gray-700 dark:border-gray-800 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                  >
                    <td className="px-6 py-2.5">{index + 1}</td>
                    <td className="px-6 py-2.5 font-medium text-gray-900 dark:text-white">
                      {item?.nama}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

TableDataMataPelajaranGuru.propTypes = {
  DataMataPelajaranGuru: PropTypes.array,
};

export default TableDataMataPelajaranGuru;
