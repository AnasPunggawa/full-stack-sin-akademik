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
import Button from '../../../../components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconPrint } from '../../../../components/ui/Icons';

function AdminCetakNilai() {
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [allMataPelajaran, setAllMataPelajaran] = useState(null);
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaId, setSiswaId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(250);

  const [nilai, dispatch] = useReducer(
    nilaiReducer,
    INITIAL_STATE_NILAI_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      if (kodeSemester && kodeKelas && siswaId) {
        setShowTable(true);
        fetchAllNilai();
        return;
        // if (siswaId) {
        //   setShowTable(true);
        //   fetchAllNilai();
        //   return;
        // }
      }
      setShowTable(false);
      return;
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
    if (!siswaId) {
      setSiswaId('');
      setKodeMataPelajaran('');
      return;
    }
    if (!kodeMataPelajaran) {
      setKodeMataPelajaran('');
      return;
    }

    return;
  }, [kodeSemester, kodeKelas, kodeMataPelajaran, siswaId]);

  function goToCetakPage() {
    const nilaiSiswa = nilai?.data?.nilai;
    const mergedNilaiMaPel = nilaiAndMataPelajaran(
      nilaiSiswa,
      allMataPelajaran
    );
    const data = {
      prevLocation: pathname,
      siswa_id: siswaId,
      semester_id: kodeSemester,
      kelas_id: kodeKelas,
      nilai: mergedNilaiMaPel,
    };
    navigate('print', {
      state: {
        success: true,
        data: data,
      },
    });
  }

  function nilaiAndMataPelajaran(nilaiSiswa, allMataPelajaran) {
    const mergedNilaiAndMataPelajaran = allMataPelajaran.map(function (
      matapelajaran
    ) {
      const hasNilai = nilaiSiswa.find(function (nilai) {
        return nilai?.matapelajaran_id === matapelajaran?.id;
      });
      return {
        ...matapelajaran,
        nilai_id: hasNilai ? hasNilai?.id : null,
        nilai: hasNilai ? hasNilai?.nilai : null,
        predikat: hasNilai ? hasNilai?.predikat : null,
        catatan: hasNilai ? hasNilai?.catatan : null,
      };
    });
    return mergedNilaiAndMataPelajaran;
  }

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
                  SetAllMataPelajaran={setAllMataPelajaran}
                />
              )}
            </>
          )}
        </div>
        {showTable && (
          <>
            {nilai?.loading && <LayoutLoading>Loading...</LayoutLoading>}
            {nilai?.error && <LayoutError>{nilai?.errorMessage}</LayoutError>}
            {!nilai?.loading && !nilai?.error && nilai?.data && (
              <>
                {!kodeMataPelajaran && (
                  <div className="flex justify-end p-4">
                    <Button
                      OnClick={() => goToCetakPage()}
                      ButtonStyle="LINK_PRIMARY"
                    >
                      <IconPrint /> Cetak
                    </Button>
                  </div>
                )}
                <LayoutSuccess>
                  <TableNilai DataTable={nilai?.data} SetPage={setPage} />
                </LayoutSuccess>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default AdminCetakNilai;
