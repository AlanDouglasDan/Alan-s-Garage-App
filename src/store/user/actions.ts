import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  updateProfile as updateProfileApi,
  updateLocation as updateLocationApi,
  getProfile as getProfileApi,
  changePassword as changePasswordApi,
  updatePhone as updatePhoneApi,
  verifyPhone as verifyPhoneApi,
  getCarRecords as getCarRecordsApi,
  getNotifications as getNotificationsApi,
  deleteAccount as deleteAccountApi,
} from '@http/user';

const SET_ERROR = 'user/SET_ERROR';
const UPDATE_PROFILE = 'user/UPDATE_PROFILE';
const UPDATE_LOCATION = 'user/UPDATE_LOCATION';
const GET_PROFILE = 'user/GET_PROFILE';
const CHANGE_PASSWORD = 'user/CHANGE_PASSWORD';
const UPDATE_PHONE = 'user/UPDATE_PHONE';
const VERIFY_PHONE = 'user/VERIFY_PHONE';
const GET_CAR_RECORDS = 'user/GET_CAR_RECORDS';
const GET_NOTIFICATIONS = 'user/GET_NOTIFICATIONS';
const DELETE_ACCOUNT = 'user/DELETE_ACCOUNT';

export const setError = createAction<boolean | string>(SET_ERROR);

export const updateProfile = createAsyncThunk<any>(
  UPDATE_PROFILE,
  async data => {
    const res = await updateProfileApi(data);

    return res;
  },
);

export const updateLocation = createAsyncThunk<any>(
  UPDATE_LOCATION,
  async data => {
    const res = await updateLocationApi(data);

    return res;
  },
);

export const getProfile = createAsyncThunk<any>(GET_PROFILE, async () => {
  const res = await getProfileApi();

  return res;
});

export const changePassword = createAsyncThunk<any>(
  CHANGE_PASSWORD,
  async data => {
    const res = await changePasswordApi(data);

    return res;
  },
);

export const updatePhone = createAsyncThunk<any>(UPDATE_PHONE, async data => {
  const res = await updatePhoneApi(data);

  return res;
});

export const verifyPhone = createAsyncThunk<any>(VERIFY_PHONE, async data => {
  const res = await verifyPhoneApi(data);

  return res;
});

export const getCarRecords = createAsyncThunk<any>(
  GET_CAR_RECORDS,
  async data => {
    const records = await getCarRecordsApi(data);

    return records;
  },
);

export const getNotifications = createAsyncThunk<any>(
  GET_NOTIFICATIONS,
  async () => {
    const notifications = await getNotificationsApi();

    return notifications;
  },
);

export const deleteAccount = createAsyncThunk<any>(
  DELETE_ACCOUNT,
  async data => {
    const res = await deleteAccountApi(data);

    return res;
  },
);
