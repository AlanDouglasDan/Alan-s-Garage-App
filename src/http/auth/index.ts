import {
  LoginData,
  LoginResponse,
  SendEmailOtpData,
  SignupData,
  SocialLoginData,
} from 'store/auth/types';

import {apiCall} from '../index';

export const sendEmailOtp = (data: SendEmailOtpData): Promise<null> =>
  apiCall({method: 'post', url: '/auth/send-email-verification-code', data});

export const forgotPassword = (data: SendEmailOtpData): Promise<null> =>
  apiCall({method: 'post', url: '/auth/forgot-password', data});

export const signUp = (data: SignupData): Promise<null> =>
  apiCall({method: 'post', url: '/auth/signup', data});

export const logIn = (data: LoginData): Promise<LoginResponse> =>
  apiCall({method: 'post', url: '/auth/login', data});

export const socialLogIn = (data: SocialLoginData): Promise<LoginResponse> =>
  apiCall({method: 'post', url: '/auth/login/social', data});

export const socialSignup = (data: SocialLoginData): Promise<LoginResponse> =>
  apiCall({method: 'post', url: '/auth/signup/social', data});

export const verifyOtp = (data): Promise<any> =>
  apiCall({method: 'post', url: '/auth/verify/email', data});
