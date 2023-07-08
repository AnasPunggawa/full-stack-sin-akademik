import api from './api';

export async function createNilai(formData) {
  return await api.post('/api/v1/nilai', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
