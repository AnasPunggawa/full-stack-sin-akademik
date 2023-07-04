import { useEffect, useReducer, useRef, useState } from 'react';
import InputSearch from '../../../../components/form/InputSearch';
import InputSelect from '../../../../components/form/InputSelect';
import Button from '../../../../components/ui/Button';
import { IconPlus } from '../../../../components/ui/Icons';
import Container from '../Container';
import Header from '../Header';
import {
  ACTION_KELAS_REDUCER,
  INITIAL_STATE_KELAS_REDUCER,
  kelasReducer,
} from '../../../../reducer/kelas/kelasReducer';
import { getAllKelas } from '../../../../api/kelas';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import TableKelas from './TableKelas';
import { useNavigate } from 'react-router-dom';

const SELECT_CATEGORY_KELAS = [
  { id: '7', name: '7' },
  { id: '8', name: '8' },
  { id: '9', name: '9' },
];

function AdminKelas() {
  const [kategoriKelas, setKategoriKelas] = useState('');
  const [searchKelas, setSearchKelas] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [kelas, dispatch] = useReducer(
    kelasReducer,
    INITIAL_STATE_KELAS_REDUCER
  );

  const navigate = useNavigate();

  const isComponentMounted = useRef(true);

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchAllKelas();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [kategoriKelas, searchKelas, page, limit]);

  async function fetchAllKelas() {
    dispatch({ type: ACTION_KELAS_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllKelas(
        kategoriKelas,
        searchKelas,
        page,
        limit
      );
      const data = response.data.data;
      dispatch({
        type: ACTION_KELAS_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setPage(data.current_page);
      setLimit(data.limit_data);
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: ACTION_KELAS_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_KELAS_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_KELAS_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  function tambahKelas() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearchKelas(inputSearch);
  }

  return (
    <>
      <Header>Kelas</Header>
      <Container>
        <div className="w-full flex flex-col gap-2 p-4">
          <div className="w-full">
            <Button OnClick={() => tambahKelas()}>
              Tambah Kelas <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div>
              <InputSelect
                HtmlFor={'kelas'}
                PlaceHolder={'Semua'}
                Value={kategoriKelas}
                OnChange={(e) => setKategoriKelas(e.target.value)}
                Options={SELECT_CATEGORY_KELAS}
              />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <InputSearch
                Placeholder={'Cari kelas'}
                Value={inputSearch}
                OnChange={(e) => setInputSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {kelas.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {kelas.error && <LayoutError>{kelas.errorMessage}</LayoutError>}
        {!kelas.loading && !kelas.error && kelas.data && (
          <LayoutSuccess>
            <TableKelas DataTable={kelas.data} SetPage={setPage} />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}

export default AdminKelas;
