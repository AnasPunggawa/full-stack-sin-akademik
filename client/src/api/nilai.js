import api from './api';

export async function getAllNilai(
  searchSiswa = '',
  siswaID = '',
  kodeSemester = '',
  kodeKelas = '',
  kodeMataPelajaran = '',
  page = 1,
  limit = 10
) {
  return await api.get(
    `/api/v1/nilai?searchNama=${searchSiswa}&siswaID=${siswaID}&kodeSemester=${kodeSemester}&kodeKelas=${kodeKelas}&kodeMataPelajaran=${kodeMataPelajaran}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function getNilai(id) {
  return await api.get(`/api/v1/nilai/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function createNilai(formData) {
  return await api.post('/api/v1/nilai', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateNilai(id, formData) {
  return await api.put(`/api/v1/nilai/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteNilai(id) {
  return await api.delete(`/api/v1/nilai/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
