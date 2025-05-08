import {AxiosError} from 'axios';

export interface RequestError extends AxiosError {
  reason?: {message: string};
}
