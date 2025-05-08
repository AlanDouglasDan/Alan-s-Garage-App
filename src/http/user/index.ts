import {apiCall} from '../index';

export const getProfile = (): Promise<any> =>
  apiCall({method: 'get', url: '/user/me'});

export const updateProfile = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/user/update', data});

export const updateLocation = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/user/location', data});

export const changePassword = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/user/change-password', data});

export const updatePhone = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/user/phone', data});

export const verifyPhone = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/user/verify/phone', data});

export const getCarRecords = (data: any): Promise<any> => {
  const queryString = new URLSearchParams(data).toString();

  return apiCall({method: 'get', url: `/car/records?${queryString}`});
};

export const getNotifications = (): Promise<any> =>
  apiCall({method: 'get', url: '/notification'});

export const deleteAccount = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/user/deactivate', data});
