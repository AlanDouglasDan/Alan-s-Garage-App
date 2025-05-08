import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  submitBid as submitBidApi,
  updateBidStatus as updateBidStatusApi,
  getRequests as getRequestsApi,
  getBids as getBidsApi,
  getBid as getBidApi,
  createAdditionalRepair as createAdditionalRepairApi,
} from '@http/request';

const SET_ERROR = 'request/SET_ERROR';
const SUBMIT_BID = 'request/SUBMIT_BID';
const UPDATE_BID_STATUS = 'request/UPDATE_BID_STATUS';
const GET_REQUESTS = 'request/GET_REQUESTS';
const GET_BIDS = 'request/GET_BIDS';
const GET_BID = 'request/GET_BID';
const CREATE_ADDITIONAL_REPAIR = 'request/CREATE_ADDITIONAL_REPAIR';

export const setError = createAction<boolean | string>(SET_ERROR);

export const submitBid = createAsyncThunk<any>(SUBMIT_BID, async data => {
  const res = await submitBidApi(data);

  return res;
});

export const updateBidStatus = createAsyncThunk<any>(
  UPDATE_BID_STATUS,
  async data => {
    const res = await updateBidStatusApi(data);

    return res;
  },
);

export const getRequests = createAsyncThunk<any>(GET_REQUESTS, async () => {
  const requests = await getRequestsApi();

  return requests;
});

export const getBids = createAsyncThunk<any>(GET_BIDS, async () => {
  const bids = await getBidsApi();

  return bids;
});

export const getBid = createAsyncThunk<any, string>(GET_BID, async id => {
  const bid = await getBidApi(id);

  return bid;
});

export const createAdditionalRepair = createAsyncThunk<any>(
  CREATE_ADDITIONAL_REPAIR,
  async data => {
    const additionalRepair = await createAdditionalRepairApi(data);

    return additionalRepair;
  },
);
