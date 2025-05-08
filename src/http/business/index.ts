import {apiCall} from '../index';

export const getBusiness = (): Promise<any> =>
  apiCall({method: 'get', url: '/business'});

export const createBusiness = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/business/create', data});

export const updateBusiness = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/business/update', data});

export const saveSchedule = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/schedule/save', data});

export const getSchedule = (): Promise<any> =>
  apiCall({method: 'get', url: '/schedule'});

export const getServices = (): Promise<any> =>
  apiCall({method: 'get', url: '/service'});

export const stripeOnboard = (data: {country: string}): Promise<any> =>
  apiCall({method: 'post', url: '/business/onboarding/create', data});

export const getGarages = (): Promise<any> =>
  apiCall({method: 'get', url: '/garage'});

export const addGarage = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/garage', data});

export const updateGarage = (data: any): Promise<any> =>
  apiCall({method: 'patch', url: '/garage', data});
