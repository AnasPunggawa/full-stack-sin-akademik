import axios from 'axios';
import { authRefreshToken } from './auth';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem('accessToken');
    // console.log('request success');
    if (token) {
      // console.log('request success TOKEN');
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      return config;
    }
    // console.log('request success NOT TOKEN');
    return config;
  },
  function (error) {
    // console.log('request error');
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    // console.log('response success');
    // console.log(response)
    return response;
  },
  async function (error) {
    // console.log('response error');
    // console.log(error);
    let config = error.config;
    // console.log(config);
    if (error.response.status === 401 && config.headers.Authorization) {
      const resRefreshToken = await authRefreshToken();
      const accessToken = resRefreshToken.data.data.accessToken;
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      localStorage.setItem('accessToken', accessToken);
      // console.log('response error REFRESH TOKEN SUCCESS');
      return api(config);
    }
    if (
      error?.response?.status === 403 &&
      config?.headers?.Authorization &&
      error?.response?.data?.data?.deleteRefreshToken
    ) {
      localStorage.clear();
      // console.log('refresh token tidak ditemukan');
      return Promise.reject(error);
    }
    // console.log('response error NOT REFRESH TOKEN');
    return Promise.reject(error);
  }
);

export default api;
