import { useState, useRef, useReducer, useEffect } from 'react';
import Container from '../Container';
import Header from '../Header';
import Button from '../../../../components/ui/Button';
import InputSearch from '../../../../components/form/InputSearch';
import { IconPlus } from '../../../../components/ui/Icons';
import {
  ACTION_GURU_REDUCER,
  guruReducer,
  INITIAL_STATE_GURU_REDUCER,
} from '../../../../reducer/guru/guruReducer';
import { getAllGuru } from '../../../../api/guru';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import TableGuru from './TableGuru';
import { useNavigate } from 'react-router-dom';

function AdminGuru() {
  const [searchGuru, setSearchGuru] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputSearch, setInputSearch] = useState('');

  const [guru, dispatch] = useReducer(guruReducer, INITIAL_STATE_GURU_REDUCER);

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchAllGuru() {
    dispatch({ type: ACTION_GURU_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllGuru(searchGuru, page, limit);
      const data = response.data.data;
      dispatch({ type: ACTION_GURU_REDUCER.FETCH_DATA_SUCCESS, payload: data });
      setPage(data.current_page);
      setLimit(data.limit_data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        dispatch({
          type: ACTION_GURU_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_GURU_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_GURU_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchAllGuru();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [searchGuru, page, limit]);

  function tambahGuru() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearchGuru(inputSearch);
  }

  return (
    <>
      <Header>Guru</Header>
      <Container>
        <div className="w-full flex flex-col gap-2 p-4">
          <div className="w-full">
            <Button OnClick={() => tambahGuru()}>
              Tambah Guru <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-end">
            <form onSubmit={(e) => handleSearch(e)}>
              <InputSearch
                Placeholder={'Cari Guru'}
                Value={inputSearch}
                OnChange={(e) => setInputSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {guru.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {guru.error && <LayoutError>{guru.errorMessage}</LayoutError>}
        {!guru.loading && !guru.error && guru.data && (
          <LayoutSuccess>
            <TableGuru DataTable={guru.data} SetPage={setPage} />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}

export default AdminGuru;
