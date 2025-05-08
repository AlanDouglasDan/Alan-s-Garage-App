import {createAction, createAsyncThunk} from '@reduxjs/toolkit';

import {
  signUp as signUpApi,
  logIn as logInApi,
  socialLogIn as socialLogInApi,
  socialSignup as socialSignupApi,
  sendEmailOtp as sendEmailOtpApi,
  forgotPassword as forgotPasswordApi,
  verifyOtp as verifyOtpApi,
} from 'http/auth';
import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';
import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {
  SignupData,
  LoginData,
  SendEmailOtpData,
  SocialLoginData,
} from './types';
import {deleteAccessToken} from 'core/security';

const SET_ERROR = 'auth/SET_ERROR';
const SET_ACCESS_TOKEN = 'auth/SET_ACCESS_TOKEN';
const SIGN_UP = 'auth/SIGN_UP';
const LOG_IN = 'auth/LOG_IN';
const SOCIAL_LOG_IN = 'auth/SOCIAL_LOG_IN';
const SOCIAL_SIGN_UP = 'auth/SOCIAL_SIGN_UP';
const SEND_EMAIL_OTP = 'auth/SEND_EMAIL_OTP';
const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD';
const VERIFY_OTP = 'auth/VERIFY_OTP';
const SET_INITIAL_AUTH_ROUTE = 'auth/SET_INITIAL_AUTH_ROUTE';
const SET_INITIAL_APP_ROUTE = 'auth/SET_INITIAL_APP_ROUTE';
const LOGOUT = 'auth/LOGOUT';
const SET_FORM_DATA = 'auth/SET_FORM_DATA';

export const setError = createAction<boolean | string>(SET_ERROR);

export const setAccessToken = createAction<any>(SET_ACCESS_TOKEN);

export const setFormData = createAction<boolean>(SET_FORM_DATA);

export const setInitialAuthRoute = createAction<keyof AuthStackNavParams>(
  SET_INITIAL_AUTH_ROUTE,
);

export const setInitialAppRoute = createAction<keyof AppStackNavParams>(
  SET_INITIAL_APP_ROUTE,
);

export const sendEmailOtp = createAsyncThunk<any, SendEmailOtpData>(
  SEND_EMAIL_OTP,
  async data => {
    const res = await sendEmailOtpApi(data);

    return res;
  },
);

export const signUp = createAsyncThunk<any, SignupData>(SIGN_UP, async data => {
  const res = await signUpApi(data);

  return res;
});

export const forgotPassword = createAsyncThunk<any, SendEmailOtpData>(
  FORGOT_PASSWORD,
  async data => {
    const res = await forgotPasswordApi(data);

    return res;
  },
);

export const logIn = createAsyncThunk<any, LoginData>(LOG_IN, async data => {
  const authSession = await logInApi(data);

  return authSession;
});

export const socialLogIn = createAsyncThunk<any, SocialLoginData>(
  SOCIAL_LOG_IN,
  async data => {
    const authSession = await socialLogInApi(data);

    return authSession;
  },
);

export const socialSignup = createAsyncThunk<any, SocialLoginData>(
  SOCIAL_SIGN_UP,
  async data => {
    const authSession = await socialSignupApi(data);

    return authSession;
  },
);

export const verifyOtp = createAsyncThunk<any>(VERIFY_OTP, async data => {
  const res = await verifyOtpApi(data);

  return res;
});

export const logOut = createAsyncThunk(LOGOUT, async () => {
  const res = await deleteAccessToken();

  return res;
});
