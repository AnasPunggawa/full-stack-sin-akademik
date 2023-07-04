import api from './api';

export async function getAllSemester(
  tingkat = '',
  searchSemester = '',
  page = 1,
  limit = 10
) {
  return await api.get(
    `/api/v1/semester?tingkat=${tingkat}&searchSemester=${searchSemester}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function getSemester(id) {
  return await api.get(`/api/v1/semester/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function createSemester(formData) {
  return await api.post('/api/v1/semester', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateSemester(id, formData) {
  return await api.put(`/api/v1/semester/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteSemester(id) {
  return await api.delete(`/api/v1/semester/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
