import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ACTION_DETAIL_SISWA_REDUCER,
  INITIAL_STATE_DETAIL_SISWA_REDUCER,
  detailSiswaReducer,
} from '../../../../reducer/siswa/detailSiswaReducer';
import { getSiswa } from '../../../../api/siswa';
import Header from '../../components/Header';
import Container from '../../components/Container';
import LayoutError from '../../../../components/ui/LayoutError';
import EditData from './components/EditData';
import LayoutLoading from '../../../../components/ui/LayoutLoading';

function EditBiodataSiswa() {
  const { id } = useParams();

  const [namaSiswa, setNamaSiswa] = useState('');

  const [detailSiswa, dispatch] = useReducer(
    detailSiswaReducer,
    INITIAL_STATE_DETAIL_SISWA_REDUCER
  );

  const isComponentMounted = useRef(false);

  async function fetchSiswa() {
    dispatch({ type: ACTION_DETAIL_SISWA_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getSiswa(id);
      const data = response.data.data;
      setNamaSiswa(data.nama);
      dispatch({
        type: ACTION_DETAIL_SISWA_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 500)
        return dispatch({
          type: ACTION_DETAIL_SISWA_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
      if (error.response)
        return dispatch({
          type: ACTION_DETAIL_SISWA_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
      return dispatch({
        type: ACTION_DETAIL_SISWA_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchSiswa();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);
  return (
    <>
      <Header>Ubah Biodata Siswa {namaSiswa}</Header>
      <Container>
        {detailSiswa.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailSiswa.error && (
          <LayoutError>{detailSiswa.errorMessage}</LayoutError>
        )}
        {!detailSiswa.loading && !detailSiswa.error && detailSiswa.data && (
          <EditData BiodataSiswa={detailSiswa.data} />
        )}
      </Container>
    </>
  );
}

export default EditBiodataSiswa;
