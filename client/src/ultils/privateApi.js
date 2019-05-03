/* eslint-disable no-param-reassign */
import axios from 'axios';

let currentToken;

const instance = axios.create();
instance.interceptors.request.use(
  (config) => {
    // add authorization header if user authorized
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;

export const setAuthToken = (token) => {
  currentToken = token;
};
