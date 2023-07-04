import api from './api';

export async function getAllMataPelajaran(nama = '', page = 1, limit = 10) {
  return await api.get(
    `/api/v1/matapelajaran?searchNama=${nama}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function getMataPelajaran(id) {
  return await api.get(`/api/v1/matapelajaran/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function createMataPelajaran(formData) {
  return await api.post('/api/v1/matapelajaran', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateMataPelajaran(id, formData) {
  return await api.put(`/api/v1/matapelajaran/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteMataPelajaran(id) {
  return await api.delete(`/api/v1/matapelajaran/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
