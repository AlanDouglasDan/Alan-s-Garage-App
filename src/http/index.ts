import axios, {AxiosRequestConfig} from 'axios';

// @ts-expect-error
import {API_URL} from '@env';
import {RequestError} from './types';
import {accept20x, getErrorMessage} from './utils';
import {deleteAccessToken} from 'core/security';
import {store} from 'store/index';
import {setAccessToken, setInitialAuthRoute} from 'store/auth/actions';

const http = axios.create({baseURL: API_URL});

export const apiCall = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const {status, data} = await http(config);

    if (!accept20x(status)) {
      throw new Error(data?.message);
    }

    return data;
  } catch (error: any) {
    if (error.status === 307) {
      store.dispatch(setInitialAuthRoute('Login'));
      await deleteAccessToken();
      store.dispatch(setAccessToken(undefined));
    }

    const message = getErrorMessage(error as RequestError);
    throw new Error(message);
  }
};

export default http;
