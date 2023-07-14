import api from './api';
const NPSN = import.meta.env.VITE_NPSN;

export async function getDataDashboardByRole(user_id = '', npsn = NPSN) {
  return await api.get(`/api/v1/dashboard?user_id=${user_id}&npsn=${npsn}`, {
    // return await api.get(`/api/v1/dashboard/${user_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function getProfilSekolah(id = NPSN) {
  return await api.get(`/api/v1/dashboard/profil/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function getIndetitasSekolah(id = NPSN) {
  return await api.get(`/api/v1/dashboard/identitas/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}

export async function getKontakSekolah(id = NPSN) {
  return await api.get(`/api/v1/dashboard/kontak/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
}
