import api from './api';

export function authLogin(formData) {
  return api.post('/api/v1/auth/login', formData);
}

export function authRefreshToken() {
  return api.get('/api/v1/auth/refresh-token', {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    // },
  });
}

export function authLogout() {
  return api.delete('/api/v1/auth/logout', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  });
}
