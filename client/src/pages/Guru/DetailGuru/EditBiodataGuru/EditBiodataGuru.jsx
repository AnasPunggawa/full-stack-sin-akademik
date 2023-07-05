import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ACTION_DETAIL_GURU_REDUCER,
  INITIAL_STATE_DETAIL_GURU_REDUCER,
  detailGuruReducer,
} from '../../../../reducer/guru/detailGuruReducer';
import { getGuru } from '../../../../api/guru';
import Header from '../../components/Header';
import Container from '../../components/Container';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import EditData from './components/EditData';

function EditBiodataGuru() {
  const { id } = useParams();

  const [namaGuru, setNamaGuru] = useState('');

  const [detailGuru, dispatch] = useReducer(
    detailGuruReducer,
    INITIAL_STATE_DETAIL_GURU_REDUCER
  );

  const isComponentMounted = useRef(false);

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

  return (
    <>
      <Header>Ubah Biodata Guru {namaGuru}</Header>
      <Container>
        {detailGuru.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailGuru.error && (
          <LayoutError>{detailGuru.errorMessage}</LayoutError>
        )}
        {!detailGuru.loading && !detailGuru.error && detailGuru.data && (
          <EditData BiodataGuru={detailGuru.data} />
        )}
      </Container>
    </>
  );
}

export default EditBiodataGuru;
