import api from './api';

export async function updateAdmin(id, formData) {
  return await api.put(`/api/v1/admin/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
