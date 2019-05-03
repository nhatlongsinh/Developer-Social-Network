import axios from 'axios';
import privateApi from './privateApi';
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/prefer-default-export

// config axios to return error data from server as error object
const setupInterceptors = (axiosInstances) => {
  axiosInstances.forEach((instance) => {
    // Add a response interceptor
    instance.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response.data) {
          // get error from server
          error = error.response.data;
        }
        return Promise.reject(error);
      }
    );
  });
};

export default setupInterceptors([axios, privateApi]);
