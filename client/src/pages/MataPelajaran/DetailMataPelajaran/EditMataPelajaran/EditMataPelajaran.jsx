import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ACTION_DETAIL_MATAPELAJARAN_REDUCER,
  INITIAL_STATE_DETAIL_MATAPELAJARAN_REDUCER,
  detailMataPelajaranReducer,
} from '../../../../reducer/mataPelajaran/detailMataPelajaranReducer';
import { getMataPelajaran } from '../../../../api/mataPelajaran';
import Header from '../../components/Header';
import Container from '../../components/Container';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import EditData from './components/EditData';

function EditMataPelajaran() {
  const { id } = useParams();

  const [namaMataPelajaran, setNamaMataPelajaran] = useState('');

  const [detailMataPelajaran, dispatch] = useReducer(
    detailMataPelajaranReducer,
    INITIAL_STATE_DETAIL_MATAPELAJARAN_REDUCER
  );

  const isComponentMounted = useRef(false);

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

  return (
    <>
      <Header>Edit Mata Pelajaran {namaMataPelajaran}</Header>
      <Container>
        {detailMataPelajaran.loading && (
          <LayoutLoading>Loading...</LayoutLoading>
        )}
        {detailMataPelajaran.error && (
          <LayoutError>{detailMataPelajaran.errorMessage}</LayoutError>
        )}
        {!detailMataPelajaran.loading &&
          !detailMataPelajaran.error &&
          detailMataPelajaran.data && (
            <EditData DataMataPelajaran={detailMataPelajaran.data} />
          )}
      </Container>
    </>
  );
}

export default EditMataPelajaran;
