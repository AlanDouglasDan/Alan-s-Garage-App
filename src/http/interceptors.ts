import {AxiosRequestConfig} from 'axios';
import {Store} from '@reduxjs/toolkit';

import {RootState} from 'store/types';
import http from 'http/index';

export default {
  setup: (store: Store<RootState>): void => {
    const addAuthorizationToken: any = async (config: AxiosRequestConfig) => {
      const {
        auth: {accessToken, formData},
      } = store.getState();

      config.headers = {
        'Content-Type': 'application/json',
      };

      if (accessToken) {
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${accessToken}`,
        };
      }

      if (formData) {
        config.headers = {
          ...(config.headers ?? {}),
          'Content-Type': 'multipart/form-data',
        };
      }

      return config;
    };

    http.interceptors.request.use(addAuthorizationToken);
  },
};
