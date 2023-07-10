import { useEffect, useReducer, useRef, useState } from 'react';
import {
  INITIAL_STATE_SISWA_REDUCER,
  siswaReducer,
} from '../../../../reducer/siswa/siswaReducer';
import { getAllNilai } from '../../../../api/nilai';
import { ACTION_NILAI_REDUCER } from '../../../../reducer/nilai/nilaiReducer';
import Header from '../Header';
import Container from '../Container';

function AdminCetakNilai() {
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaId, setSiswaId] = useState('');
  const [page, SetPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [siswa, dispatch] = useReducer(
    siswaReducer,
    INITIAL_STATE_SISWA_REDUCER
  );

  const isComponentMounted = useRef(false);

  async function fetchAllNilai() {
    dispatch({ type: ACTION_NILAI_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllNilai(
        '',
        siswaId,
        kodeSemester,
        kodeKelas,
        kodeMataPelajaran,
        page,
        limit
      );
      const data = response.data.data;
      console.log(data.nilai);
      dispatch({
        type: ACTION_NILAI_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      SetPage(data.current_page);
      setLimit(data.limit_data);
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        dispatch({
          type: ACTION_NILAI_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_NILAI_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_NILAI_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchAllNilai();
      if (kodeSemester && kodeKelas) {
        fetchAllNilai();
        return;
      }
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [siswaId, kodeSemester, kodeKelas, kodeMataPelajaran, page, limit]);

  useEffect(() => {
    if (!kodeSemester) {
      setKodeSemester('');
      return;
    }
    if (!kodeKelas) {
      setKodeKelas('');
      return;
    }
    if (!kodeMataPelajaran) {
      setKodeMataPelajaran('');
      return;
    }
    if (!siswaId) {
      setSiswaId('');
      return;
    }
    return;
  }, [kodeSemester, kodeKelas, kodeMataPelajaran, siswaId]);

  return (
    <>
      <Header>Cetak Nilai</Header>
      <Container>Halaman Cetak Nilai</Container>
    </>
  );
}

export default AdminCetakNilai;
