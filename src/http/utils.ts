import {AxiosError} from 'axios';

import {RequestError} from './types';

export const accept4xx = (status: number): boolean =>
  status >= 200 && status < 500;

export const accept20x = (status: number): boolean =>
  /20[0-9]/.test(String(status));

export const accept5xx = (status: number): boolean =>
  /5[0-9][0-9]/.test(String(status));

export const isNetWorkError = (error: AxiosError): boolean =>
  !!error.isAxiosError && !error.response;

export const getErrorMessage = (error: RequestError): any => {
  if (error && error.response) {
    return (error.response as any)?.data?.message;
  }

  return error;
};
