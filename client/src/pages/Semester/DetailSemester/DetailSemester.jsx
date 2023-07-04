import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Container from '../components/Container';
import Button from '../../../components/ui/Button';
import { IconChevronLeft } from '../../../components/ui/Icons';
import {
  ACTION_DETAIL_SEMESTER_REDUCER,
  INITIAL_STATE_DETAIL_SEMESTER_REDUCER,
  detailSemesterReducer,
} from '../../../reducer/semester/detailSemesterReducer';
import { getSemester } from '../../../api/semester';
import LayoutLoading from '../../../components/ui/LayoutLoading';
import LayoutError from '../../../components/ui/LayoutError';
import DetailData from './components/DetailData';
import DeleteSemester from './components/DeleteSemester';

function DetailSemester() {
  const { id } = useParams();

  const [namaSemester, setNamaSemester] = useState('');

  const [detailSemester, dispatch] = useReducer(
    detailSemesterReducer,
    INITIAL_STATE_DETAIL_SEMESTER_REDUCER
  );

  const isComponentMounted = useRef(false);

  const navigate = useNavigate();

  async function fetchSemester() {
    dispatch({ type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getSemester(id);
      const data = response.data.data;
      dispatch({
        type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      console.log(data);
      setNamaSemester(`${data.tahunAjaran} ${data.semester.toUpperCase()}`);
    } catch (error) {
      if (error.response?.status === 500)
        return dispatch({
          type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
      if (error.response)
        return dispatch({
          type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
      dispatch({
        type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchSemester();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  function handleKembali() {
    navigate('/semester');
  }

  function handleEdit() {
    navigate('edit');
  }

  return (
    <>
      <Header>Semester {namaSemester}</Header>
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
            <div className="flex gap-2 sm:gap-4">
              <Button OnClick={() => handleEdit()} ButtonStyle="LINK_PRIMARY">
                Edit
              </Button>
              <DeleteSemester Semester={detailSemester.data} />
            </div>
          </div>
        </div>
        {detailSemester.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailSemester.error && (
          <LayoutError>{detailSemester.errorMessage}</LayoutError>
        )}
        {!detailSemester.loading &&
          !detailSemester.error &&
          detailSemester.data && (
            <DetailData DataSemester={detailSemester.data} />
          )}
      </Container>
    </>
  );
}

export default DetailSemester;
