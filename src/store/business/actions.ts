import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  createBusiness as createBusinessApi,
  updateBusiness as updateBusinessApi,
  saveSchedule as saveScheduleApi,
  getSchedule as getScheduleApi,
  getBusiness as getBusinessApi,
  getServices as getServicesApi,
  stripeOnboard as stripeOnboardApi,
  addGarage as addGarageApi,
  updateGarage as updateGarageApi,
  getGarages as getGaragesApi,
} from '@http/business';

const SET_ERROR = 'business/SET_ERROR';
const CREATE_BUSINESS = 'business/CREATE_BUSINESS';
const UPDATE_BUSINESS = 'business/UPDATE_BUSINESS';
const SAVE_SCHEDULE = 'business/SAVE_SCHEDULE';
const GET_SCHEDULE = 'business/GET_SCHEDULE';
const GET_BUSINESS = 'business/GET_BUSINESS';
const GET_SERVICES = 'business/GET_SERVICES';
const STRIPE_ONBOARD = 'business/STRIPE_ONBOARD';
const ADD_GARAGE = 'business/ADD_GARAGE';
const UPDATE_GARAGE = 'business/UPDATE_GARAGE';
const GET_GARAGES = 'business/GET_GARAGES';

export const setError = createAction<boolean | string>(SET_ERROR);

export const createBusiness = createAsyncThunk<any>(
  CREATE_BUSINESS,
  async data => {
    const res = await createBusinessApi(data);

    return res;
  },
);

export const updateBusiness = createAsyncThunk<any>(
  UPDATE_BUSINESS,
  async data => {
    const res = await updateBusinessApi(data);

    return res;
  },
);

export const saveSchedule = createAsyncThunk<any>(SAVE_SCHEDULE, async data => {
  const res = await saveScheduleApi(data);

  return res;
});

export const getSchedule = createAsyncThunk<any>(GET_SCHEDULE, async () => {
  const res = await getScheduleApi();

  return res;
});

export const getBusiness = createAsyncThunk<any>(GET_BUSINESS, async () => {
  const res = await getBusinessApi();

  return res;
});

export const getServices = createAsyncThunk<any>(GET_SERVICES, async () => {
  const res = await getServicesApi();

  return res;
});

export const stripeOnboard = createAsyncThunk<any, {country: string}>(
  STRIPE_ONBOARD,
  async data => {
    const res = await stripeOnboardApi(data);

    return res;
  },
);

export const addGarage = createAsyncThunk<any>(ADD_GARAGE, async data => {
  const res = await addGarageApi(data);

  return res;
});

export const updateGarage = createAsyncThunk<any>(UPDATE_GARAGE, async data => {
  const res = await updateGarageApi(data);

  return res;
});

export const getGarages = createAsyncThunk<any>(GET_GARAGES, async () => {
  const res = await getGaragesApi();

  return res;
});
