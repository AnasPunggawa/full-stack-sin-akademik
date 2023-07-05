import api from './api';

export async function getAllSiswa(searchSiswa = '', page = 1, limit = 10) {
  return await api.get(
    `/api/v1/siswa?searchNama=${searchSiswa}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function getSiswa(id) {
  return await api.get(`api/v1/siswa/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function createSiswa(formData) {
  return await api.post('/api/v1/siswa', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateSiswa(id, formData) {
  return await api.put(`/api/v1/siswa/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteSiswa(id) {
  return await api.delete(`/api/v1/siswa/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
