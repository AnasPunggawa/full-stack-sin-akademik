import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ACTION_DETAIL_NILAI_REDUCER,
  INITIAL_STATE_DETAIL_NILAI_REDUCER,
  detailNilaiReducer,
} from '../../../../reducer/nilai/detailNilaiReducer';
import { getNilai } from '../../../../api/nilai';
import Header from '../../components/Header';
import Container from '../../components/Container';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import EditData from './components/EditData';

function EditNilaiSiswa() {
  const { id } = useParams();
  const [namaSiswa, setNamaSiswa] = useState('');
  const [detailNilai, dispatch] = useReducer(
    detailNilaiReducer,
    INITIAL_STATE_DETAIL_NILAI_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchNilai() {
    dispatch({ type: ACTION_DETAIL_NILAI_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getNilai(id);
      const data = response.data.data;
      setNamaSiswa(data.siswa.nama);
      if (!data.semester.status) return navigate(`/penilaian/${id}`);
      dispatch({
        type: ACTION_DETAIL_NILAI_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 500)
        return dispatch({
          type: ACTION_DETAIL_NILAI_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
      if (error.response)
        return dispatch({
          type: ACTION_DETAIL_NILAI_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
      return dispatch({
        type: ACTION_DETAIL_NILAI_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchNilai();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  return (
    <>
      <Header>Edit Nilai {namaSiswa}</Header>
      <Container>
        {detailNilai.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailNilai.error && (
          <LayoutError>{detailNilai.errorMessage}</LayoutError>
        )}
        {!detailNilai.loading && !detailNilai.error && detailNilai.data && (
          <EditData NilaiSiswa={detailNilai.data} />
        )}
      </Container>
    </>
  );
}

export default EditNilaiSiswa;
