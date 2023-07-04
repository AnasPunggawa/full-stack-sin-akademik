import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Button from '../../../../components/ui/Button';
import DeleteMataPelajaran from './DeleteMataPelajaran';
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD_MATAPELAJARAN = [
  {
    name: 'No',
    style: 'px-6 py-3 w-1/12',
  },
  {
    name: 'Mata Pelajaran',
    style: 'px-6 py-3 w-4/12',
  },
  {
    name: 'Guru',
    style: 'px-6 py-3 w-4/12',
  },
  {
    name: 'Aksi',
    style: 'px-6 py-3 w-3/12',
  },
];

function TableMataPelajaran({ DataTable, SetPage }) {
  const { mataPelajaran, total_data, total_page, current_page } = DataTable;

  const navigate = useNavigate();

  function handlePageChange(e) {
    SetPage(e.selected + 1);
  }

  function handleDetail(mataPelajaranID) {
    navigate(mataPelajaranID);
  }

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
          <tr>
            {TABLE_HEAD_MATAPELAJARAN.map((item, index) => {
              return (
                <th key={index} className={item.style}>
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {mataPelajaran &&
            mataPelajaran?.map((item, index) => {
              return (
                <tr
                  key={item?.id}
                  className="bg-white border-b dark:bg-gray-700 dark:border-gray-800 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                >
                  <td className="px-6 py-2.5">{index + 1}</td>
                  <td className="px-6 py-2.5 font-semibold text-gray-900 dark:text-white">
                    {item?.nama}
                  </td>
                  <td className="px-6 py-2.5">
                    <div className="">
                      {item?.guru?.length !== 0
                        ? item?.guru.map((guru, i, arr) => {
                            if (arr.length - 1 === i)
                              return (
                                <span key={guru?.user_id}>{guru?.nama}</span>
                              );
                            return (
                              <span key={guru?.user_id}>{guru?.nama}, </span>
                            );
                          })
                        : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-2.5 inline-flex gap-2 flex-wrap">
                    <Button
                      OnClick={() => handleDetail(item?.id)}
                      ButtonStyle="LINK_PRIMARY"
                    >
                      Detail
                    </Button>
                    <DeleteMataPelajaran MataPelajaran={item} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {mataPelajaran && (
        <div className="w-full px-3 py-2.5 flex flex-wrap justify-between items-center gap-2">
          <div>
            <h3 className="text-sm text-gray-900 dark:text-white">
              Ditampilkan{' '}
              <span className="font-semibold">{mataPelajaran.length}</span> dari{' '}
              <span className="font-semibold">{total_data}</span> mata pelajaran
            </h3>
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

TableMataPelajaran.propTypes = {
  DataTable: PropTypes.object,
  SetPage: PropTypes.func,
};

export default TableMataPelajaran;
