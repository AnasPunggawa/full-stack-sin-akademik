import { useEffect, useReducer, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACTION_NILAI_REDUCER,
  INITIAL_STATE_NILAI_REDUCER,
  nilaiReducer,
} from '../../../../reducer/nilai/nilaiReducer';
import { getAllNilai } from '../../../../api/nilai';
import Header from '../Header';
import Container from '../Container';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import SelectSiswa from './SelectSiswa';
import SelectSemester from './SelectSemester';
import SelectMataPelajaran from './SelectMataPelajaran';
import TableNilai from './TableNilai';
import Button from '../../../../components/ui/Button';
import { IconPrint } from '../../../../components/ui/Icons';

function SiswaCetakNilai() {
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [allMataPelajaran, setAllMataPelajaran] = useState(null);
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [siswaId, setSiswaId] = useState('');
  const [siswaInfo, setSiswaInfo] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

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
      if (kodeSemester && kodeKelas && siswaId) {
        setShowTable(true);
        fetchAllNilai();
        return;
      }
      setShowTable(false);
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [siswaId, kodeSemester, kodeKelas, kodeMataPelajaran, page, limit]);

  useEffect(() => {
    if (!kodeSemester) {
      setKodeSemester('');
      setKodeMataPelajaran('');
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

  function goToCetakPage() {
    const nilaiSiswa = nilai?.data?.nilai;
    const mergedNilaiMaPel = nilaiAndMataPelajaran(
      nilaiSiswa,
      allMataPelajaran
    );
    const data = {
      prevLocation: pathname,
      semester_id: kodeSemester,
      kelas_id: kodeKelas,
      siswaInfo: {
        siswa_id: siswaInfo?.id,
        siswa_nama: siswaInfo?.nama,
        siswa_nis: siswaInfo.nis,
        siswa_nisn: siswaInfo.nisn,
      },
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
          <SelectSiswa SetSiswaId={setSiswaId} SetSiswaInfo={setSiswaInfo} />
          <SelectSemester
            SiswaId={siswaId}
            SetKodeSemester={setKodeSemester}
            SetKodeKelas={setKodeKelas}
          />
          {siswaId && kodeSemester && kodeKelas && (
            <>
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
                SetAllMataPelajaran={setAllMataPelajaran}
              />
              {!kodeMataPelajaran && (
                <div className="w-full mt-3 sm:mt-0 flex justify-end items-end">
                  <Button
                    OnClick={() => goToCetakPage()}
                    ButtonStyle="LINK_PRIMARY"
                  >
                    <IconPrint /> Cetak
                  </Button>
                </div>
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

export default SiswaCetakNilai;
