import api from './api';

export async function getDataDashboardByRole(user_id) {
  return await api.get(`/api/v1/dashboard?user_id=${user_id}`, {
    // return await api.get(`/api/v1/dashboard/${user_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
