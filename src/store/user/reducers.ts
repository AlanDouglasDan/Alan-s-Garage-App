import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';

import {UserState} from './types';
import {
  setError,
  getProfile,
  updateProfile,
  updateLocation,
  changePassword,
  updatePhone,
  verifyPhone,
  getCarRecords,
  getNotifications,
  deleteAccount,
} from './actions';

const initialState: UserState = {
  loading: false,
  loading2: false,
  error: false,
  current: undefined,
  carRecords: undefined,
  notifications: undefined,
};

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder.addCase(setError, (state, {payload}) => {
      state.error = payload;
    });

    builder.addCase(getProfile.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.current = payload.data;
    });

    builder.addCase(getCarRecords.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.carRecords = payload.data.results;
    });

    builder.addCase(getNotifications.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.notifications = payload.data;
    });

    builder.addMatcher(isAnyOf(updateLocation.fulfilled), state => {
      state.loading2 = false;
    });

    builder.addMatcher(
      isAnyOf(
        updateProfile.fulfilled,
        changePassword.fulfilled,
        updatePhone.fulfilled,
        verifyPhone.fulfilled,
        deleteAccount.fulfilled,
      ),
      state => {
        state.loading = false;
      },
    );

    builder.addMatcher(isAnyOf(updateLocation.pending), state => {
      state.loading2 = true;
      state.error = false;
    });

    builder.addMatcher(
      isAnyOf(
        updateProfile.pending,
        getProfile.pending,
        changePassword.pending,
        updatePhone.pending,
        verifyPhone.pending,
        getCarRecords.pending,
        getNotifications.pending,
        deleteAccount.pending,
      ),
      state => {
        state.loading = true;
        state.error = false;
      },
    );

    builder.addMatcher(isAnyOf(updateLocation.rejected), (state, {error}) => {
      state.loading2 = false;
      state.error = error?.message || true;
    });

    builder.addMatcher(
      isAnyOf(
        updateProfile.rejected,
        getProfile.rejected,
        changePassword.rejected,
        updatePhone.rejected,
        verifyPhone.rejected,
        getCarRecords.rejected,
        getNotifications.rejected,
        deleteAccount.rejected,
      ),
      (state, {error}) => {
        state.loading = false;
        state.error = error?.message || true;
      },
    );
  },
});

export default userStore.reducer;
