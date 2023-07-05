import jwtDecode from 'jwt-decode';
import { useEffect, useReducer, useRef } from 'react';
import {
  ACTION_USER_REDUCER,
  INITIAL_STATE_USER_REDUCER,
  userReducer,
} from '../../../reducer/users/userReducer';
import { getUser } from '../../../api/users';
import Header from '../components/Header';
import Container from '../components/Container';
import LayoutError from '../../../components/ui/LayoutError';
import LayoutLoading from '../../../components/ui/LayoutLoading';
import EditData from './components/EditData';

function EditAkun() {
  const getAccessToken = localStorage.getItem('accessToken');
  const decodeAccessToken = jwtDecode(getAccessToken);

  const [detailUser, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE_USER_REDUCER
  );

  const isComponentMounted = useRef(false);

  async function fetchDataUser() {
    dispatch({ type: ACTION_USER_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getUser(decodeAccessToken?.id);
      const data = response.data.data;
      dispatch({ type: ACTION_USER_REDUCER.FETCH_DATA_SUCCESS, payload: data });
    } catch (error) {
      if (error.response?.status === 500) {
        dispatch({
          type: ACTION_USER_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_USER_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_USER_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchDataUser();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  return (
    <>
      <Header>Akun User</Header>
      <Container>
        {detailUser.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailUser.error && (
          <LayoutError>{detailUser.errorMessage}</LayoutError>
        )}
        {!detailUser.loading && !detailUser.error && detailUser.data && (
          <EditData AkunUser={detailUser.data} />
        )}
      </Container>
    </>
  );
}

export default EditAkun;
