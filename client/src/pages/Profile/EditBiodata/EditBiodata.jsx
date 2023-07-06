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
import LayoutLoading from '../../../components/ui/LayoutLoading';
import LayoutError from '../../../components/ui/LayoutError';
import EditDataAdmin from './components/admin/EditDataAdmin';
import EditDataGuru from './components/guru/EditDataGuru';
import EditDataSiswa from './components/siswa/EditDataSiswa';

function EditBiodata() {
  const getAccessToken = localStorage.getItem('accessToken');
  const user = jwtDecode(getAccessToken);

  const [detailUser, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE_USER_REDUCER
  );

  const isComponentMounted = useRef(false);

  async function fetchDataUser() {
    dispatch({ type: ACTION_USER_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getUser(user?.id);
      const data = response.data.data;
      console.log(data);
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
      <Header>Biodata User</Header>
      <Container>
        {detailUser.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {detailUser.error && (
          <LayoutError>{detailUser.errorMessage}</LayoutError>
        )}
        {user?.role === 'admin' &&
          !detailUser.loading &&
          !detailUser.error &&
          detailUser.data && (
            <EditDataAdmin BiodataAdmin={detailUser?.data?.admin[0]} />
          )}
        {user?.role === 'guru' &&
          !detailUser.loading &&
          !detailUser.error &&
          detailUser.data && (
            <EditDataGuru BiodataGuru={detailUser?.data?.guru[0]} />
          )}
        {user?.role === 'siswa' &&
          !detailUser.loading &&
          !detailUser.error &&
          detailUser.data && (
            <EditDataSiswa BiodataSiswa={detailUser?.data?.siswa[0]} />
          )}
      </Container>
    </>
  );
}

export default EditBiodata;
