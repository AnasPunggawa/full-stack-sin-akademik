import { useEffect, useReducer, useRef, useState } from 'react';
import Container from '../Container';
import Header from '../Header';
import {
  ACTION_NILAI_REDUCER,
  INITIAL_STATE_NILAI_REDUCER,
  nilaiReducer,
} from '../../../../reducer/nilai/nilaiReducer';
import { getAllNilai } from '../../../../api/nilai';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import SelectSiswa from './SelectSiswa';
import SelectKelas from './SelectKelas';
import SelectSemester from './SelectSemester';
import SelectMataPelajaran from './SelectMataPelajaran';
import TableNilai from './TableNilai';
import Button from '../../../../components/ui/Button';
import { IconPrint } from '../../../../components/ui/Icons';
import { useLocation, useNavigate } from 'react-router-dom';

function GuruCetakNilai() {
  const [guruInfo, setGuruInfo] = useState(null);
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [allSiswa, setAllSiswa] = useState(null);
  const [siswaId, setSiswaId] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

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
      if (kodeSemester && kodeKelas && kodeMataPelajaran) {
        setShowTable(true);
        fetchAllNilai();
        return;
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
    if (!kodeMataPelajaran) {
      setKodeMataPelajaran('');
      setSiswaId('');
      return;
    }
    if (!siswaId) {
      setSiswaId('');
      return;
    }
    return;
  }, [kodeSemester, kodeKelas, kodeMataPelajaran, siswaId]);

  function goToCetakPage() {
    const nilaiSiswa = nilai?.data?.nilai;
    const mergedNilaiSiswa = mergeNilaiAllSiswa(nilaiSiswa, allSiswa);
    const data = {
      prevLocation: pathname,
      semester_id: kodeSemester,
      kelas_id: kodeKelas,
      matapelajaran_id: kodeMataPelajaran,
      guruInfo: {
        guru_id: guruInfo?.id,
        nama: guruInfo?.nama,
        nip: guruInfo?.nip,
      },
      nilai: mergedNilaiSiswa,
    };
    navigate('print', {
      state: {
        success: true,
        data: data,
      },
    });
  }

  function mergeNilaiAllSiswa(nilaiSiswa, allSiswa) {
    const mergedNilaiAndAllSiswa = allSiswa.map(function (siswa) {
      const hasNilai = nilaiSiswa.find(function (nilai) {
        return nilai.siswa_id === siswa.id;
      });
      return {
        ...siswa,
        nilai_id: hasNilai ? hasNilai.id : null,
        nilai: hasNilai ? hasNilai.nilai : null,
        predikat: hasNilai ? hasNilai.predikat : null,
        catatan: hasNilai ? hasNilai.catatan : null,
      };
    });
    return mergedNilaiAndAllSiswa;
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
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
                SetGuruInfo={setGuruInfo}
              />
              {kodeMataPelajaran && (
                <>
                  <SelectSiswa
                    KodeSemester={kodeSemester}
                    KodeKelas={kodeKelas}
                    SetAllSiswa={setAllSiswa}
                    SetSiswaId={setSiswaId}
                  />
                </>
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
                {!siswaId && (
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

export default GuruCetakNilai;
