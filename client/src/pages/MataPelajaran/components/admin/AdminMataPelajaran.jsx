import { useEffect, useReducer, useRef, useState } from 'react';
import { getAllMataPelajaran } from '../../../../api/mataPelajaran';
import Header from '../Header';
import Container from '../Container';
import TableMataPelajaran from './TableMataPelajaran';
import {
  ACTION_MATAPELAJARAN_REDUCER,
  INITIAL_STATE_MATAPELAJARAN_REDUCER,
  mataPelajaranReducer,
} from '../../../../reducer/mataPelajaran/mataPelajaranReducer';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import Button from '../../../../components/ui/Button';
import { IconPlus } from '../../../../components/ui/Icons';
import InputSearch from '../../../../components/form/InputSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';
import BoxSuccess from '../../../../components/ui/BoxSuccess';

function AdminMataPelajaran() {
  const [searchMataPelajaran, setSearchMataPelajaran] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputSearch, setInputSearch] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  const [mataPelajaran, dispatch] = useReducer(
    mataPelajaranReducer,
    INITIAL_STATE_MATAPELAJARAN_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  async function fetchAllMataPelajaran() {
    dispatch({ type: ACTION_MATAPELAJARAN_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllMataPelajaran(
        searchMataPelajaran,
        page,
        limit
      );
      const data = response.data.data;
      dispatch({
        type: ACTION_MATAPELAJARAN_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setPage(data.current_page);
      setLimit(data.limit_data);
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: ACTION_MATAPELAJARAN_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_MATAPELAJARAN_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_MATAPELAJARAN_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchAllMataPelajaran();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [searchMataPelajaran, page, limit, refreshCount]);

  function tambahMataPelajaran() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearchMataPelajaran(inputSearch);
  }

  return (
    <>
      <Header>Mata Pelajaran</Header>
      <Container>
        <div className="w-full flex flex-col gap-3 p-4">
          {state && !state?.success && <BoxError>{state?.message}</BoxError>}
          {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
          <div className="w-full">
            <Button OnClick={() => tambahMataPelajaran()}>
              Tambah Mata Pelajaran <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end">
            <form onSubmit={(e) => handleSearch(e)}>
              <InputSearch
                Placeholder={'Cari Mata Pelajaran'}
                Value={inputSearch}
                OnChange={(e) => setInputSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {mataPelajaran.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {mataPelajaran.error && (
          <LayoutError>{mataPelajaran.errorMessage}</LayoutError>
        )}
        {!mataPelajaran.loading &&
          !mataPelajaran.error &&
          mataPelajaran.data && (
            <LayoutSuccess>
              <TableMataPelajaran
                DataTable={mataPelajaran.data}
                SetPage={setPage}
                SetRefreshCount={setRefreshCount}
              />
            </LayoutSuccess>
          )}
      </Container>
    </>
  );
}

export default AdminMataPelajaran;
