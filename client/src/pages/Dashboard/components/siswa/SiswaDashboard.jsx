import PropTypes from 'prop-types';
import { useEffect, useReducer, useRef } from 'react';
import { getDataDashboardByRole } from '../../../../api/dashboard';
import Container from '../Container';
import Header from '../Header';
import DashboardHeader from './DashboardHeader';
import DashboardInfoSekolah from './DashboardInfoSekolah';
import {
  ACTION_DATA_DASHBOARD_REDUCER,
  INITIAL_STATE_DATA_DASHBOARD_REDUCER,
  dataDashboardReducer,
} from '../../../../reducer/dashboard/dashboardReducer';
import LayoutLoading from '../../../../components/ui/LayoutLoading';
import LayoutError from '../../../../components/ui/LayoutError';

function SiswaDashboard({ User_id, NPSN }) {
  const [dataDashboard, dispatch] = useReducer(
    dataDashboardReducer,
    INITIAL_STATE_DATA_DASHBOARD_REDUCER
  );

  const isComponentMounted = useRef(false);

  async function fetchDataDashboard() {
    dispatch({ type: ACTION_DATA_DASHBOARD_REDUCER.FETCH_DATA_LOADING });
    try {
      const response = await getDataDashboardByRole(User_id, NPSN);
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
          !dataDashboard.loading &&
          !dataDashboard.error &&
          dataDashboard?.data && (
            <>
              <div className="w-full p-4 space-y-4">
                <DashboardHeader
                  ProfilSekolah={
                    dataDashboard?.data?.informasi_sekolah?.profil_sekolah
                  }
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

SiswaDashboard.propTypes = {
  User_id: PropTypes.string,
  NPSN: PropTypes.string,
};

export default SiswaDashboard;
