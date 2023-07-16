import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import DeleteSemester from './DeleteSemester';
import Button from '../../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
// import DeleteKelas from './DeleteKelas';

const TABLE_HEAD_SEMESTER = [
  {
    name: 'No',
    style: 'px-6 py-3 w-1/12',
  },
  {
    name: 'Kode Semester',
    style: 'px-6 py-3 w-3/12',
  },
  {
    name: 'Tahun Ajaran',
    style: 'px-6 py-3 w-3/12',
  },
  {
    name: 'Semester',
    style: 'px-6 py-3 w-1/12',
  },
  {
    name: 'Status',
    style: 'px-6 py-3 w-1/12',
  },
  {
    name: 'Aksi',
    style: 'px-6 py-3 w-3/12',
  },
];

function TableSemester({ DataTable, SetPage, SetRefreshCount }) {
  const { semester, total_data, total_page, current_page } = DataTable;

  const navigate = useNavigate();

  function handlePageChange(e) {
    SetPage(e.selected + 1);
  }

  function handleDetail(id) {
    navigate(id);
  }

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
          <tr>
            {TABLE_HEAD_SEMESTER.map((item, index) => {
              return (
                <th key={index} className={item.style}>
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {semester &&
            semester?.map((item, index) => {
              return (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-700 dark:border-gray-800 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  <td className="px-6 py-2.5">{index + 1}</td>
                  <td className="px-6 py-2.5 font-semibold text-gray-900 dark:text-white">
                    {item.kodeSemester}
                  </td>
                  <td className="px-6 py-2.5">{item.tahunAjaran}</td>
                  <td className="px-6 py-2.5">{item.semester}</td>
                  <td className="px-6 py-2.5">
                    {item.status ? 'Aktif' : 'Tidak Aktif'}
                  </td>
                  <td className="px-6 py-2.5 inline-flex gap-2 flex-wrap">
                    <Button
                      OnClick={() => handleDetail(item?.id)}
                      ButtonStyle="LINK_PRIMARY"
                    >
                      Detail
                    </Button>
                    <DeleteSemester
                      Semester={item}
                      SetRefreshCount={SetRefreshCount}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {semester && (
        <div className="w-full px-3 py-2.5 flex flex-wrap justify-between items-center gap-2">
          <div>
            <p className="text-sm text-gray-900 dark:text-white">
              Ditampilkan{' '}
              <span className="font-semibold">{semester.length}</span> dari{' '}
              <span className="font-semibold">{total_data}</span> semester
            </p>
          </div>
          <div>
            <nav key={total_page}>
              <ReactPaginate
                previousLabel="<"
                breakLabel="..."
                nextLabel=">"
                pageCount={total_page}
                initialPage={current_page - 1}
                onPageChange={(e) => handlePageChange(e)}
                pageRangeDisplayed={3}
                previousClassName="flex rounded-l-md leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                previousLinkClassName="flex items-center justify-center w-8 px-1 py-1"
                nextClassName="flex rounded-r-md leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                nextLinkClassName="flex items-center justify-center w-8 px-1 py-1"
                breakClassName="flex leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                breakLinkClassName="flex items-center justify-center w-8 px-1 py-1"
                containerClassName="flex text-sm"
                pageClassName="flex leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                pageLinkClassName="flex items-center justify-center w-8 px-1 py-1"
                activeLinkClassName="font-bold text-blue-600 dark:text-white"
                activeClassName="leading-tight border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-gray-800 dark:bg-gray-800 dark:hover:bg-gray-900"
                disabledLinkClassName="text-gray-400 dark:text-gray-500 cursor-not-allowed"
              />
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

TableSemester.propTypes = {
  DataTable: PropTypes.object,
  SetPage: PropTypes.func,
  SetRefreshCount: PropTypes.func,
};

export default TableSemester;
