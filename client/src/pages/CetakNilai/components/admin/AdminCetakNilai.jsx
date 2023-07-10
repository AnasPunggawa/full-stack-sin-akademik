import { useEffect, useReducer, useRef, useState } from 'react';
import { getAllNilai } from '../../../../api/nilai';
import {
  ACTION_NILAI_REDUCER,
  INITIAL_STATE_NILAI_REDUCER,
  nilaiReducer,
} from '../../../../reducer/nilai/nilaiReducer';
import Header from '../Header';
import Container from '../Container';
import SelectSemester from './SelectSemester';
import SelectKelas from './SelectKelas';
import SelectMataPelajaran from './SelectMataPelajaran';
import SelectSiswa from './SelectSiswa';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';

function AdminCetakNilai() {
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaId, setSiswaId] = useState('');
  const [page, SetPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [nilai, dispatch] = useReducer(
    nilaiReducer,
    INITIAL_STATE_NILAI_REDUCER
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
      // fetchAllNilai();
      if (kodeSemester && kodeKelas) {
        if (siswaId || kodeMataPelajaran) {
          fetchAllNilai();
          return;
        }
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
      <Container>
        {/* <div className="w-full flex flex-col gap-3 p-4"> */}
        {/* <div className="flex flex-wrap gap-3 items-end justify-between"> */}
        <div className="w-full grid gap-2 sm:grid-cols-2 p-4">
          <SelectSemester SetKodeSemester={setKodeSemester} />
          <SelectKelas SetKodeKelas={setKodeKelas} />
          {kodeSemester && kodeKelas && (
            <>
              <SelectSiswa SetSiswaId={setSiswaId} />
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
              />
            </>
          )}
        </div>
        {/* </div> */}
        {/* </div> */}
        <h1>Kode Semester: {kodeSemester}</h1>
        <h1>Kode Kelas: {kodeKelas}</h1>
        <h1>Kode Mata Pelajaran: {kodeMataPelajaran}</h1>
        <h1>Siswa ID: {siswaId}</h1>
        {nilai?.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {nilai?.error && <LayoutError>{nilai?.errorMessage}</LayoutError>}
      </Container>
    </>
  );
}

export default AdminCetakNilai;
