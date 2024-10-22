import { IconPlus } from '../../../../components/ui/Icons';
import { useEffect, useReducer, useRef, useState } from 'react';
import TableUser from './TableUser';
import Button from '../../../../components/ui/Button';
import Header from '../Header';
import Container from '../Container';
import { useLocation, useNavigate } from 'react-router-dom';
import InputSelect from '../../../../components/form/InputSelect';
import InputSearch from '../../../../components/form/InputSearch';
import {
  ACTION_USERS_REDUCER,
  INITIAL_STATE_USERS_REDUCER,
  usersReducer,
} from '../../../../reducer/users/usersReducer';
import { getUsers } from '../../../../api/users';
import LayoutSuccess from '../../../../components/ui/LayoutSuccess';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';
import { SELECT_ROLE } from '../../../../config/role';
import BoxSuccess from '../../../../components/ui/BoxSuccess';
import BoxError from '../../../../components/ui/BoxError';

// const SELECT_ROLE = [
//   {
//     id: 'admin',
//     name: 'Admin',
//   },
//   {
//     id: 'guru',
//     name: 'Guru',
//   },
//   {
//     id: 'siswa',
//     name: 'Siswa',
//   },
// ];

function AdminUsers() {
  const [kategoriRole, setKategoriRole] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [refreshCount, setRefreshCount] = useState(0);

  const [users, dispatch] = useReducer(
    usersReducer,
    INITIAL_STATE_USERS_REDUCER
  );

  const isComponentMounted = useRef(true);

  const navigate = useNavigate();
  const { state } = useLocation();

  async function fetchUsers() {
    dispatch({ type: ACTION_USERS_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getUsers(
        kategoriRole,
        searchUsername,
        page,
        limit
      );
      const data = response.data.data;
      dispatch({
        type: ACTION_USERS_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
      setPage(data.current_page);
      setLimit(data.limit_data);
    } catch (error) {
      if (error.response.status === 500) {
        dispatch({
          type: ACTION_USERS_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_USERS_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_USERS_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchUsers();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, [searchUsername, kategoriRole, page, limit, refreshCount]);

  function tambahUser() {
    navigate('new');
  }

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearchUsername(inputSearch);
  }

  return (
    <>
      <Header>Users</Header>
      <Container>
        <div className="w-full flex flex-col gap-3 p-4">
          {state && !state?.success && <BoxError>{state?.message}</BoxError>}
          {state && state?.success && <BoxSuccess>{state?.message}</BoxSuccess>}
          <div className="w-full">
            <Button OnClick={() => tambahUser()}>
              Tambah User <IconPlus />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div>
              <InputSelect
                HtmlFor={'role'}
                PlaceHolder={'Semua'}
                SelectSize="SMALL"
                Options={SELECT_ROLE}
                Value={kategoriRole}
                OnChange={(e) => setKategoriRole(e.target.value)}
              />
            </div>
            <form onSubmit={(e) => handleSearch(e)}>
              <InputSearch
                Placeholder={'Cari username'}
                Value={inputSearch}
                OnChange={(e) => setInputSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        {users.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {users.error && <LayoutError>{users.errorMessage}</LayoutError>}
        {!users.loading && !users.error && users.data && (
          <LayoutSuccess>
            <TableUser
              DataTable={users.data}
              SetPage={setPage}
              SetRefreshCount={setRefreshCount}
            />
          </LayoutSuccess>
        )}
      </Container>
    </>
  );
}
export default AdminUsers;
