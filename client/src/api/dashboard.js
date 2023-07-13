import api from './api';

export async function getDataDashboardByRole(user_id = '', npsn = '') {
  return await api.get(`/api/v1/dashboard?user_id=${user_id}&npsn=${npsn}`, {
    // return await api.get(`/api/v1/dashboard/${user_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
