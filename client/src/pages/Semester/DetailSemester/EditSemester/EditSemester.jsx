import { useEffect, useReducer, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ACTION_DETAIL_SEMESTER_REDUCER,
  INITIAL_STATE_DETAIL_SEMESTER_REDUCER,
  detailSemesterReducer,
} from '../../../../reducer/semester/detailSemesterReducer';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { getSemester } from '../../../../api/semester';
import EditData from './components/EditData';

function EditSemester() {
  const { id } = useParams();

  const [namaSemester, setNamaSemester] = useState('');

  const [detailSemester, dispatch] = useReducer(
    detailSemesterReducer,
    INITIAL_STATE_DETAIL_SEMESTER_REDUCER
  );

  const isComponentMounted = useRef(false);

  async function fetchSemester() {
    dispatch({ type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getSemester(id);
      const data = response.data.data;
      dispatch({
        type: ACTION_DETAIL_SEMESTER_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
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
  return (
    <>
      <Header>Edit Semester {namaSemester}</Header>
      <Container>
        {detailSemester.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailSemester.error && (
          <LayoutError>{detailSemester.errorMessage}</LayoutError>
        )}
        {!detailSemester.loading &&
          !detailSemester.error &&
          detailSemester.data && (
            <EditData DataSemester={detailSemester.data} />
          )}
      </Container>
    </>
  );
}

export default EditSemester;
