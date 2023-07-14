import PropTypes from 'prop-types';
import { useEffect, useReducer, useRef } from 'react';
import { getDataDashboardByRole } from '../../../../api/dashboard';
import Container from '../Container';
import Header from '../Header';
import DashboardCardsInfo from './DashboardCardsInfo';
import DashboardHeader from './DashboardHeader';
import DashboardInfoSekolah from './DashboardInfoSekolah';
import {
  ACTION_DATA_DASHBOARD_REDUCER,
  INITIAL_STATE_DATA_DASHBOARD_REDUCER,
  dataDashboardReducer,
} from '../../../../reducer/dashboard/dashboardReducer';
import LayoutError from '../../../../components/ui/LayoutError';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import { useLocation } from 'react-router-dom';
import BoxError from '../../../../components/ui/BoxError';
import BoxSuccess from '../../../../components/ui/BoxSuccess';
// import { Navigate } from 'react-router-dom';

function AdminDashboard({ User_id, NPSN }) {
  const [dataDashboard, dispatch] = useReducer(
    dataDashboardReducer,
    INITIAL_STATE_DATA_DASHBOARD_REDUCER
  );

  const isComponentMounted = useRef(false);

  const { state } = useLocation();

  async function fetchDataDashboard() {
    dispatch({ type: ACTION_DATA_DASHBOARD_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getDataDashboardByRole(User_id, NPSN);
      // const response = await getDataDashboardByRole(User_id);
      const data = response.data.data;
      dispatch({
        type: ACTION_DATA_DASHBOARD_REDUCER.FETCH_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response?.status === 500) {
        dispatch({
          type: ACTION_DATA_DASHBOARD_REDUCER.FETCH_DATA_ERROR,
          payload: 'Something went wrong',
        });
        return;
      }
      if (error.response) {
        dispatch({
          type: ACTION_DATA_DASHBOARD_REDUCER.FETCH_DATA_ERROR,
          payload: error.response.data.message,
        });
        return;
      }
      dispatch({
        type: ACTION_DATA_DASHBOARD_REDUCER.FETCH_DATA_ERROR,
        payload: 'Something went wrong',
      });
    }
  }

  useEffect(() => {
    isComponentMounted.current = true;
    if (isComponentMounted.current) {
      if (!isComponentMounted.current) return;
      fetchDataDashboard();
    }
    return () => {
      isComponentMounted.current = false;
    };
  }, []);

  return (
    <>
      <Header>Dashboard</Header>
      <Container>
        {dataDashboard.loading && <LayoutLoading>Loading...</LayoutLoading>}
        {dataDashboard.error && (
          <LayoutError>{dataDashboard.errorMessage}</LayoutError>
        )}
        {User_id &&
          !dataDashboard.error &&
          !dataDashboard.loading &&
          dataDashboard?.data && (
            <>
              <div className="w-full p-4 space-y-4">
                <DashboardHeader />
                {state && !state?.success && (
                  <BoxError>{state?.message}</BoxError>
                )}
                {state && state?.success && (
                  <BoxSuccess>{state?.message}</BoxSuccess>
                )}
                <DashboardCardsInfo
                  ClassName="w-full grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3"
                  CardsCountValue={dataDashboard?.data?.data_count}
                />
                <DashboardInfoSekolah
                  InformasiSekolah={dataDashboard?.data?.informasi_sekolah}
                />
              </div>
            </>
          )}
      </Container>
    </>
  );
}

AdminDashboard.propTypes = {
  User_id: PropTypes.string,
  NPSN: PropTypes.string,
};

export default AdminDashboard;
