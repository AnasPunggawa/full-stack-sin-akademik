import api from './api';

export async function createAdmin(formData) {
  return await api.post('/api/v1/admin', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateAdmin(id, formData) {
  return await api.put(`/api/v1/admin/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
