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
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import TableNilai from './TableNilai';

function AdminCetakNilai() {
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaId, setSiswaId] = useState('');
  const [page, setPage] = useState(1);
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
      dispatch({
        type: ACTION_NILAI_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setPage(data.current_page);
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
        <div className="w-full grid gap-2 sm:grid-cols-2 p-4">
          <SelectSemester SetKodeSemester={setKodeSemester} />
          <SelectKelas SetKodeKelas={setKodeKelas} />
          {kodeSemester && kodeKelas && (
            <>
              <SelectSiswa
                KodeSemester={kodeSemester}
                KodeKelas={kodeKelas}
                SetSiswaId={setSiswaId}
              />
              {siswaId && (
                <SelectMataPelajaran
                  SetKodeMataPelajaran={setKodeMataPelajaran}
                />
              )}
            </>
          )}
        </div>
        {nilai?.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {nilai?.error && <LayoutError>{nilai?.errorMessage}</LayoutError>}
        {!nilai?.loading && !nilai?.error && nilai?.data && (
          <LayoutSuccess>
            <TableNilai DataTable={nilai?.data} SetPage={setPage} />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}

export default AdminCetakNilai;
