import { useNavigate, useParams } from 'react-router-dom';
import useAuthUser from '../../../hooks/useAuthUser';
import Header from '../components/Header';
import Container from '../components/Container';
import { useEffect, useReducer, useRef, useState } from 'react';
import {
  ACTION_DETAIL_SISWA_REDUCER,
  INITIAL_STATE_DETAIL_SISWA_REDUCER,
  detailSiswaReducer,
} from '../../../reducer/siswa/detailSiswaReducer';
import { getSiswa } from '../../../api/siswa';
import AdminDetailSiswa from './components/admin/AdminDetailSiswa';
import Button from '../../../components/ui/Button';
import { IconChevronLeft } from '../../../components/ui/Icons';
import LayoutError from '../../../components/ui/LayoutError';
import LayoutLoading from '../../../components/ui/LayoutLoading';
import GuruDetailSiswa from './components/guru/GuruDetailSiswa';

function DetailSiswa() {
  const { id } = useParams();
  const { user } = useAuthUser();

  const [namaSiswa, setNamaSiswa] = useState('');

  const [detailSiswa, dispatch] = useReducer(
    detailSiswaReducer,
    INITIAL_STATE_DETAIL_SISWA_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchSiswa() {
    dispatch({ type: ACTION_DETAIL_SISWA_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getSiswa(id);
      const data = response.data.data;
      console.log(data);
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

  function handleKembali() {
    navigate('/siswa');
  }

  return (
    <>
      <Header>Siswa {namaSiswa}</Header>
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
            {user?.role === 'admin' && detailSiswa.data && (
              <div className="flex gap-2 sm:gap-4">
                <Button ButtonStyle="LINK_DANGER">Delete</Button>
                {/* <DeleteSiswa Siswa={detailSiswa.data} /> */}
              </div>
            )}
          </div>
        </div>
        {detailSiswa.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailSiswa.error && (
          <LayoutError>{detailSiswa.errorMessage}</LayoutError>
        )}
        {user?.role === 'admin' &&
          !detailSiswa.loading &&
          !detailSiswa.error &&
          detailSiswa.data && <AdminDetailSiswa DataSiswa={detailSiswa.data} />}
        {user?.role === 'guru' &&
          !detailSiswa.loading &&
          !detailSiswa.error &&
          detailSiswa.data && <GuruDetailSiswa DataSiswa={detailSiswa.data} />}
      </Container>
    </>
  );
}

export default DetailSiswa;
