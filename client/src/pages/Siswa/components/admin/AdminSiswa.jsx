import { useEffect, useReducer, useRef, useState } from 'react';
import Container from '../Container';
import Header from '../Header';
import {
  ACTION_SISWA_REDUCER,
  INITIAL_STATE_SISWA_REDUCER,
  siswaReducer,
} from '../../../../reducer/siswa/siswaReducer';
import Button from '../../../../components/ui/Button';
import { IconPlus } from '../../../../components/ui/Icons';
import InputSearch from '../../../../components/form/InputSearch';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import { getAllSiswa } from '../../../../api/siswa';
import TableSiswa from './TableSiswa';
import { useLocation, useNavigate } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';
import BoxSuccess from '../../../../components/ui/BoxSuccess';

function AdminSiswa() {
  const [searchSiswa, setSearchSiswa] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputSearch, setInputSearch] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  const [siswa, dispatch] = useReducer(
    siswaReducer,
    INITIAL_STATE_SISWA_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  async function fetchAllSiswa() {
    dispatch({ type: ACTION_SISWA_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllSiswa(searchSiswa, page, limit);
      const data = response?.data?.data;
      dispatch({
        type: ACTION_SISWA_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setPage(data?.current_page);
      setLimit(data?.limit_data);
    } catch (error) {
      if (error.response?.status === 500) {
        dispatch({
          type: ACTION_SISWA_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_SISWA_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_SISWA_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchAllSiswa();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [searchSiswa, page, limit, refreshCount]);

  function tambahSiswa() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearchSiswa(inputSearch);
  }

  return (
    <>
      <Header>Siswa</Header>
      <Container>
        <div className="w-full flex flex-col gap-3 p-4">
          {state && !state?.success && <BoxError>{state?.message}</BoxError>}
          {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
          <div className="w-full">
            <Button OnClick={() => tambahSiswa()}>
              Tambah Siswa <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end">
            <form onSubmit={(e) => handleSearch(e)}>
              <InputSearch
                Placeholder={'Cari siswa'}
                Value={inputSearch}
                OnChange={(e) => setInputSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {siswa?.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {siswa?.error && <LayoutError>{siswa?.errorMessage}</LayoutError>}
        {!siswa?.loading && !siswa?.error && siswa?.data && (
          <LayoutSuccess>
            <TableSiswa
              DataTable={siswa?.data}
              SetPage={setPage}
              SetRefreshCount={setRefreshCount}
            />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}

export default AdminSiswa;
