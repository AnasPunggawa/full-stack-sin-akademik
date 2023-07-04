import api from './api';

export async function getUsers(
  role = '',
  searchUsername = '',
  page = 1,
  limit = 10
) {
  return await api.get(
    `/api/v1/user?role=${role}&searchUsername=${searchUsername}&page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );
}

export async function getUser(id) {
  return await api.get(`/api/v1/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function createUser(formData) {
  return await api.post('api/v1/user/', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function updateUser(id, formData) {
  return await api.put(`/api/v1/user/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function deleteUser(id) {
  return await api.delete(`/api/v1/user/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
