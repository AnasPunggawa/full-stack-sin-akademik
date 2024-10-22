import { useEffect, useReducer, useRef, useState } from 'react';
import InputSearch from '../../../../components/form/InputSearch';
import InputSelect from '../../../../components/form/InputSelect';
import Button from '../../../../components/ui/Button';
import { IconPlus } from '../../../../components/ui/Icons';
import Container from '../Container';
import Header from '../Header';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACTION_SEMESTER_REDUCER,
  INITIAL_STATE_SEMESTER_REDUCER,
  semesterReducer,
} from '../../../../reducer/semester/semesterReducer';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import { getAllSemester } from '../../../../api/semester';
import TableSemester from './TableSemester';
import { SELECT_SEMESTER } from '../../../../config/semester';
import BoxSuccess from '../../../../components/ui/BoxSuccess';
import BoxError from '../../../../components/ui/BoxError';

// const SELECT_SEMESTER = [
//   { id: 'ganjil', name: 'Ganjil' },
//   { id: 'genap', name: 'Genap' },
// ];

function AdminSemester() {
  const [kategoriSemester, setKategoriSemester] = useState('');
  const [searchSemester, setSearchSemester] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [refreshCount, setRefreshCount] = useState(0);

  const [semester, dispatch] = useReducer(
    semesterReducer,
    INITIAL_STATE_SEMESTER_REDUCER
  );

  const navigate = useNavigate();
  const { state } = useLocation();

  const isComponentMounted = useRef(true);

  async function fetchAllSemester() {
    dispatch({ type: ACTION_SEMESTER_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllSemester(
        kategoriSemester,
        searchSemester,
        page,
        limit
      );
      const data = response.data.data;
      dispatch({
        type: ACTION_SEMESTER_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setPage(data?.current_page);
      setLimit(data?.limit_data);
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: ACTION_SEMESTER_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_SEMESTER_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_SEMESTER_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchAllSemester();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [kategoriSemester, searchSemester, page, limit, refreshCount]);

  function tambahSemester() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearchSemester(inputSearch);
  }

  return (
    <>
      <Header>Semester</Header>
      <Container>
        <div className="w-full flex flex-col gap-3 p-4">
          {state && !state?.success && <BoxError>{state?.message}</BoxError>}
          {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
          <div className="w-full">
            <Button OnClick={() => tambahSemester()}>
              Tambah Semester <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div>
              <InputSelect
                HtmlFor={'semester'}
                PlaceHolder={'Semua'}
                SelectSize="SMALL"
                Options={SELECT_SEMESTER}
                Value={kategoriSemester}
                OnChange={(e) => setKategoriSemester(e.target.value)}
              />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <InputSearch
                Placeholder={'Cari semester'}
                Value={inputSearch}
                OnChange={(e) => setInputSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {semester.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {semester.error && <LayoutError>{semester.errorMessage}</LayoutError>}
        {!semester.loading && !semester.error && semester.data && (
          <LayoutSuccess>
            <TableSemester
              DataTable={semester.data}
              SetPage={setPage}
              SetRefreshCount={setRefreshCount}
            />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}

export default AdminSemester;
