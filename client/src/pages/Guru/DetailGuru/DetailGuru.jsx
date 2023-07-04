import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Container from '../components/Container';
import Button from '../../../components/ui/Button';
import { IconChevronLeft } from '../../../components/ui/Icons';
import { useEffect, useReducer, useRef, useState } from 'react';
import {
  ACTION_DETAIL_GURU_REDUCER,
  INITIAL_STATE_DETAIL_GURU_REDUCER,
  detailGuruReducer,
} from '../../../reducer/guru/detailGuruReducer';
import { getGuru } from '../../../api/guru';
import LayoutError from '../../../components/ui/LayoutError';
import LayoutLoading from '../../../components/ui/LayoutLoading';
import DetailData from './components/DetailData';
import DeleteGuru from './components/DeleteGuru';

function DetailGuru() {
  const { id } = useParams();

  const [namaGuru, setNamaGuru] = useState('');

  const [detailGuru, dispatch] = useReducer(
    detailGuruReducer,
    INITIAL_STATE_DETAIL_GURU_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchGuru() {
    dispatch({ type: ACTION_DETAIL_GURU_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getGuru(id);
      const data = response.data.data;
      console.log(data);
      setNamaGuru(data.nama);
      dispatch({
        type: ACTION_DETAIL_GURU_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 500)
        return dispatch({
          type: ACTION_DETAIL_GURU_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
      if (error.response)
        return dispatch({
          type: ACTION_DETAIL_GURU_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
      return dispatch({
        type: ACTION_DETAIL_GURU_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchGuru();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  function handleKembali() {
    navigate('/guru');
  }

  return (
    <>
      <Header>Guru {namaGuru}</Header>
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
              <DeleteGuru Guru={detailGuru.data} />
            </div>
          </div>
        </div>
        {detailGuru.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailGuru.error && (
          <LayoutError>{detailGuru.errorMessage}</LayoutError>
        )}
        {!detailGuru.loading && !detailGuru.error && detailGuru.data && (
          <DetailData DataGuru={detailGuru.data} />
        )}
      </Container>
    </>
  );
}

export default DetailGuru;
