import api from './api';

export async function getAllGuru(searchGuru = '', page = 1, limit = 10) {
  return await api.get(
    `/api/v1/guru?searchNama=${searchGuru}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function getGuru(id) {
  return await api.get(`/api/v1/guru/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function createGuru(formData) {
  return await api.post('/api/v1/guru', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteGuru(id) {
  return await api.delete(`/api/v1/guru/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
