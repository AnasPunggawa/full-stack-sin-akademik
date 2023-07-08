import api from './api';

export async function getAllNilai(
  searchSiswa = '',
  kodeSemester = '',
  kodeKelas = '',
  kodeMataPelajaran = '',
  page = 1,
  limit = 10
) {
  return await api.get(
    `/api/v1/nilai?searchNama=${searchSiswa}&kodeSemester=${kodeSemester}&kodeKelas=${kodeKelas}&kodeMataPelajaran=${kodeMataPelajaran}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function createNilai(formData) {
  return await api.post('/api/v1/nilai', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
