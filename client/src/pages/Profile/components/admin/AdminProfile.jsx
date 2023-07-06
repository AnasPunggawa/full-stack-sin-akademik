import { useEffect, useReducer, useRef } from 'react';
import jwtDecode from 'jwt-decode';
import Container from '../Container';
import Header from '../Header';
import {
  ACTION_USER_REDUCER,
  INITIAL_STATE_USER_REDUCER,
  userReducer,
} from '../../../../reducer/users/userReducer';
import { getUser } from '../../../../api/users';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import AdminDetailProfile from './AdminDetailProfile';
// import { Navigate, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import AddBiodata from '../../AddBiodata/AddBiodata';

function AdminProfile() {
  const getAccessToken = localStorage.getItem('accessToken');
  const decodeAccessToken = jwtDecode(getAccessToken);

  const [detailUser, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE_USER_REDUCER
  );

  const isComponentMounted = useRef(false);

  // const navigate = useNavigate();

  async function fetchDataUser() {
    dispatch({ type: ACTION_USER_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getUser(decodeAccessToken?.id);
      const data = response.data.data;
      console.log(data);
      dispatch({ type: ACTION_USER_REDUCER.FETCH_DATA_SUCCESS, payload: data });
      // if (data.admin[0]) return navigate('add-biodata');
      // if (data.admin.length === 1)
      //   return navigate('add-biodata', { state: data, replace: true });
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
      <Header>Profile</Header>
      <Container>
        {detailUser.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailUser.error && (
          <LayoutError>{detailUser.errorMessage}</LayoutError>
        )}
        {!detailUser.loading && !detailUser.error && detailUser.data && (
          // <AdminDetailProfile DataUser={detailUser.data} />
          <>
            {detailUser.data.admin[0] ? (
              <AdminDetailProfile DataUser={detailUser.data} />
            ) : (
              <Navigate to="add-biodata" state={detailUser.data} />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default AdminProfile;
