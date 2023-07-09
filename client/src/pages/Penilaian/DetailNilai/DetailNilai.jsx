import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ACTION_DETAIL_NILAI_REDUCER,
  INITIAL_STATE_DETAIL_NILAI_REDUCER,
  detailNilaiReducer,
} from '../../../reducer/nilai/detailNilaiReducer';
import Header from '../components/Header';
import Container from '../components/Container';
import Button from '../../../components/ui/Button';
import { IconChevronLeft } from '../../../components/ui/Icons';
import { getNilai } from '../../../api/nilai';
import LayoutError from '../../../components/ui/LayoutError';
import LayoutLoading from '../../../components/ui/LayoutLoading';
import DetailData from './components/DetailData';
import DeleteNilai from './components/DeleteNilai';
import jwtDecode from 'jwt-decode';

function DetailNilai() {
  const getAccessToken = localStorage.getItem('accessToken');
  const decodeAccessToken = jwtDecode(getAccessToken);

  const { id } = useParams();

  const [namaSiswa, setNamaSiswa] = useState('');
  const [statusSemester, setStatusSemester] = useState(true);
  const [authorized, setAuthorized] = useState(false);
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
      console.log(data);
      console.log(decodeAccessToken);
      if (data.guru.user_id === decodeAccessToken.id) setAuthorized(true);
      // if (decodeAccessToken?.id !== data.guru.user_id)
      //   return navigate('/penilaian', {
      //     state: { success: false, message: 'Anda tidak memiliki akses' },
      //     replace: true,
      //   });
      setNamaSiswa(data.siswa.nama);
      setStatusSemester(data.semester.status);
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

  function handleKembali() {
    navigate('/penilaian');
  }

  function handleEdit() {
    // console.log('go to edit page');
    navigate('edit');
  }

  return (
    <>
      <Header>Nilai {namaSiswa}</Header>
      <Container>
        <div className="w-full px-4 pt-4">
          <div className="w-full flex flex-wrap justify-between pb-1 border-b-2 border-gray-300 dark:border-gray-500">
            <Button
              OnClick={() => handleKembali()}
              ButtonStyle="LINK_SECONDARY"
            >
              <div className="flex items-center gap-1">
                <IconChevronLeft /> Kembali
              </div>
            </Button>
            {authorized && (
              <div className="flex gap-2 sm:gap-4">
                {statusSemester && (
                  <Button
                    OnClick={() => handleEdit()}
                    ButtonStyle="LINK_PRIMARY"
                  >
                    Edit
                  </Button>
                )}
                <DeleteNilai Nilai={detailNilai.data} />
              </div>
            )}
          </div>
        </div>
        {detailNilai.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailNilai.error && (
          <LayoutError>{detailNilai.errorMessage}</LayoutError>
        )}
        {!detailNilai.loading && !detailNilai.error && detailNilai.data && (
          <DetailData DataNilai={detailNilai.data} />
        )}
      </Container>
    </>
  );
}

export default DetailNilai;
