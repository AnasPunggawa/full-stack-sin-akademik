import api from './api';

export async function getAllKelas(
  tingkat = '',
  searchKelas = '',
  page = 1,
  limit = 10
) {
  return await api.get(
    `/api/v1/kelas?tingkat=${tingkat}&searchKelas=${searchKelas}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function createKelas(formData) {
  return await api.post('/api/v1/kelas', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteKelas(id) {
  return await api.delete(`/api/v1/kelas/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
