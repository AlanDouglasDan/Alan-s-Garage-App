import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';

import {storeAccessToken} from 'core/security';
import {AuthState} from './types';
import {
  setError,
  setAccessToken,
  signUp,
  logIn,
  socialLogIn,
  socialSignup,
  setInitialAuthRoute,
  setInitialAppRoute,
  sendEmailOtp,
  forgotPassword,
  verifyOtp,
  logOut,
  setFormData
} from './actions';

const initialState: AuthState = {
  loading: false,
  error: false,
  accessToken: undefined,
  initialAuthRoute: undefined,
  initialAppRoute: undefined,
  current: undefined,
  formData: false,
};

const authStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(setError, (state, {payload}) => {
      state.error = payload;
    });

    builder.addCase(setAccessToken, (state, {payload}) => {
      state.accessToken = payload;
    });

    builder.addCase(setFormData, (state, {payload}) => {
      state.formData = payload;
    });

    builder.addCase(setInitialAuthRoute, (state, {payload}) => {
      state.initialAuthRoute = payload;
    });

    builder.addCase(setInitialAppRoute, (state, {payload}) => {
      state.initialAppRoute = payload;
    });

    builder.addCase(logIn.fulfilled, (state, {payload}) => {
      state.loading = false;
      storeAccessToken(payload.data.access.token);
      state.accessToken = payload.data.access.token;
    });

    builder.addCase(socialLogIn.fulfilled, (state, {payload}) => {
      state.loading = false;
      storeAccessToken(payload.data.access.token);
      state.accessToken = payload.data.access.token;
    });

    builder.addCase(logOut.fulfilled, state => {
      state.loading = false;
      state.initialAuthRoute = 'Login';
      state.initialAppRoute = 'Bottom Tabs';
      state.accessToken = undefined;
    });

    builder.addMatcher(
      isAnyOf(verifyOtp.fulfilled, socialSignup.fulfilled),
      (state, {payload}) => {
        state.loading = false;
        state.initialAppRoute = 'Add Name';
        storeAccessToken(payload.data.token.access.token);
        state.accessToken = payload.data.token.access.token;
      },
    );

    builder.addMatcher(
      isAnyOf(
        sendEmailOtp.fulfilled,
        forgotPassword.fulfilled,
        signUp.fulfilled,
      ),
      state => {
        state.loading = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        signUp.pending,
        logIn.pending,
        socialLogIn.pending,
        socialSignup.pending,
        sendEmailOtp.pending,
        forgotPassword.pending,
        verifyOtp.pending,
        logOut.pending,
      ),
      state => {
        state.loading = true;
        state.error = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        signUp.rejected,
        logIn.rejected,
        socialLogIn.rejected,
        socialSignup.rejected,
        sendEmailOtp.rejected,
        forgotPassword.rejected,
        verifyOtp.rejected,
        logOut.rejected,
      ),
      (state, {error}) => {
        state.loading = false;
        state.error = error?.message || true;
      },
    );
  },
});

export default authStore.reducer;
