import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Container from '../components/Container';
import Button from '../../../components/ui/Button';
import { IconChevronLeft } from '../../../components/ui/Icons';
import {
  ACTION_DETAIL_MATAPELAJARAN_REDUCER,
  INITIAL_STATE_DETAIL_MATAPELAJARAN_REDUCER,
  detailMataPelajaranReducer,
} from '../../../reducer/mataPelajaran/detailMataPelajaranReducer';
import { getMataPelajaran } from '../../../api/mataPelajaran';
import LayoutLoading from '../../../components/ui/LayoutLoading';
import LayoutError from '../../../components/ui/LayoutError';
import DetailData from './components/DetailData';
import DeleteMataPelajaran from './components/DeleteMataPelajaran';

function DetailMataPelajaran() {
  const { id } = useParams();

  const [namaMataPelajaran, setNamaMataPelajaran] = useState('');

  const [detailMataPelajaran, dispatch] = useReducer(
    detailMataPelajaranReducer,
    INITIAL_STATE_DETAIL_MATAPELAJARAN_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchMataPelajaran() {
    dispatch({ type: ACTION_DETAIL_MATAPELAJARAN_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getMataPelajaran(id);
      const data = response.data.data;
      dispatch({
        type: ACTION_DETAIL_MATAPELAJARAN_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setNamaMataPelajaran(data.nama);
    } catch (error) {
      if (error.response?.status === 500)
        return dispatch({
          type: ACTION_DETAIL_MATAPELAJARAN_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
      if (error.response)
        return dispatch({
          type: ACTION_DETAIL_MATAPELAJARAN_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
      dispatch({
        type: ACTION_DETAIL_MATAPELAJARAN_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchMataPelajaran();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  function handleKembali() {
    navigate('/mata-pelajaran');
  }

  function handleEdit() {
    navigate(`edit`);
  }

  return (
    <>
      <Header>Mata Pelajaran {namaMataPelajaran}</Header>
      <Container>
        <div className="w-full px-4 pt-4">
          <div className="w-full flex flex-wrap justify-between pb-1 border-b-2 border-gray-300 dark:border-gray-500">
            <Button
              OnClick={() => handleKembali()}
              ButtonStyle="LINK_SECONDARY"
            >
              <div className="flex items-center gap-1">
                <IconChevronLeft /> Kembali
              </div>
            </Button>
            <div className="flex gap-2 sm:gap-4">
              <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
                Edit
              </Button>
              <DeleteMataPelajaran MataPelajaran={detailMataPelajaran.data} />
            </div>
          </div>
        </div>
        {detailMataPelajaran.loading && (
          <LayoutLoading>Loading...</LayoutLoading>
        )}
        {detailMataPelajaran.error && (
          <LayoutError>{detailMataPelajaran.errorMessage}</LayoutError>
        )}
        {!detailMataPelajaran.loading &&
          !detailMataPelajaran.error &&
          detailMataPelajaran.data && (
            <DetailData DataMataPelajaran={detailMataPelajaran.data} />
          )}
      </Container>
    </>
  );
}

export default DetailMataPelajaran;
