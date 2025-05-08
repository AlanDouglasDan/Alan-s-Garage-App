import {apiCall} from '../index';

export const submitBid = (data): Promise<any> =>
  apiCall({method: 'post', url: '/bid', data});

export const updateBidStatus = (data): Promise<any> =>
  apiCall({method: 'patch', url: '/bid/status', data});

export const getRequests = (): Promise<any> =>
  apiCall({method: 'get', url: '/request/garage'});

export const getBids = (): Promise<any> =>
  apiCall({method: 'get', url: '/bid'});

export const getBid = (id: string): Promise<any> =>
  apiCall({method: 'get', url: `/bid/${id}`});

export const createAdditionalRepair = (data: any): Promise<any> =>
  apiCall({method: 'post', url: '/additional-repair', data});
