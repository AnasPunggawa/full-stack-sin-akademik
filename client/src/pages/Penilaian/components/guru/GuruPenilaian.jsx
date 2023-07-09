import { useEffect, useReducer, useRef, useState } from 'react';
import InputSearch from '../../../../components/form/InputSearch';
import Button from '../../../../components/ui/Button';
import { IconPlus } from '../../../../components/ui/Icons';
import Container from '../Container';
import Header from '../Header';
import SelectSemester from './SelectSemester';
import SelectKelas from './SelectKelas';
import SelectMataPelajaran from './SelectMataPelajaran';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ACTION_NILAI_REDUCER,
  INITIAL_STATE_NILAI_REDUCER,
  nilaiReducer,
} from '../../../../reducer/nilai/nilaiReducer';
import { getAllNilai } from '../../../../api/nilai';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import TableNilai from './TableNilai';
import BoxSuccess from '../../../../components/ui/BoxSuccess';
import BoxError from '../../../../components/ui/BoxError';

function GuruPenilaian() {
  const { state } = useLocation();
  const [kodeSemester, setKodeSemester] = useState('');
  const [kodeKelas, setKodeKelas] = useState('');
  const [kodeMataPelajaran, setKodeMataPelajaran] = useState('');
  const [searchSiswa, setSearchSiswa] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [inputSearch, setInputSearch] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  const [nilai, dispatch] = useReducer(
    nilaiReducer,
    INITIAL_STATE_NILAI_REDUCER
  );

  const isComponentMounted = useRef(true);

  const navigate = useNavigate();

  async function fetchAllNilai() {
    dispatch({ type: ACTION_NILAI_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getAllNilai(
        searchSiswa,
        kodeSemester,
        kodeKelas,
        kodeMataPelajaran,
        page,
        limit
      );
      const data = response.data.data;
      console.log(data);
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
      if (kodeSemester && kodeKelas && kodeMataPelajaran) {
        fetchAllNilai();
        return;
      }
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [
    kodeSemester,
    kodeKelas,
    kodeMataPelajaran,
    searchSiswa,
    page,
    limit,
    refreshCount,
  ]);

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
    return;
  }, [kodeSemester, kodeKelas, kodeMataPelajaran]);

  function tambahNilai() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearchSiswa(inputSearch);
    setPage(1);
  }

  return (
    <>
      <Header>Penilaian</Header>
      <Container>
        <div className="w-full flex flex-col gap-3 p-4">
          {state && !state?.success && <BoxError>{state?.message}</BoxError>}
          {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
          <div className="w-full">
            <Button OnClick={() => tambahNilai()}>
              Tambah Nilai <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap gap-3 items-end justify-between">
            {/* <div className="flex w-full sm:w-2/6 flex-col gap-2"> */}
            <div className="w-full grid gap-2 sm:grid-cols-2">
              <SelectSemester SetKodeSemester={setKodeSemester} />
              <SelectKelas SetKodeKelas={setKodeKelas} />
              <SelectMataPelajaran
                SetKodeMataPelajaran={setKodeMataPelajaran}
              />
              <div className="w-full flex gap-2 items-end justify-end flex-wrap sm:flex-nowrap">
                <form onSubmit={(e) => handleSearch(e)}>
                  <InputSearch
                    Placeholder={'Cari siswa'}
                    Value={inputSearch}
                    OnChange={(e) => setInputSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>
            {/* <div className="w-full flex items-center justify-between">
              <Button OnClick={() => tambahNilai()}>Selesai</Button>
              <form onSubmit={(e) => handleSearch(e)}>
                <InputSearch
                  Placeholder={'Cari siswa'}
                  Value={inputSearch}
                  OnChange={(e) => setInputSearch(e.target.value)}
                />
              </form>
            </div> */}
          </div>
        </div>
        {nilai.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {nilai.error && <LayoutError>{nilai.errorMessage}</LayoutError>}
        {!nilai.loading && !nilai.error && nilai.data && (
          <LayoutSuccess>
            <TableNilai
              DataTable={nilai.data}
              SetPage={setPage}
              SetRefreshCount={setRefreshCount}
            />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}

export default GuruPenilaian;
