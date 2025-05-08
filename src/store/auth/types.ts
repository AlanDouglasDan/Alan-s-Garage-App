import {AppStackNavParams} from 'navigation/app-stack/AppStackNav';
import {AuthStackNavParams} from 'navigation/auth-stack/AuthStackNav';

export interface AuthState {
  loading: boolean;
  error: boolean | string;
  accessToken?: string;
  initialAuthRoute?: keyof AuthStackNavParams;
  initialAppRoute?: keyof AppStackNavParams;
  current?: any;
  formData?: boolean;
}

export interface AuthHookReturn extends AuthState {
  setError: (error: boolean | string) => void;
  setAccessToken: (data: any) => void;
  signUp: (data: SignupData) => any;
  logIn: (data: LoginData) => any;
  socialLogIn: (data: SocialLoginData) => any;
  socialSignup: (data: SocialLoginData) => any;
  sendEmailOtp: (data: SendEmailOtpData) => any;
  forgotPassword: (data: SendEmailOtpData) => any;
  verifyOtp: (data: any) => any;
  logOut: () => any;
  setFormData: (data: boolean) => any;
}

export interface SignupData {
  email: string;
  userType: 'garage_owner' | 'car_owner';
}

export interface LoginData {
  email: string;
  password: string;
  userType: 'garage_owner' | 'car_owner';
}

export interface SocialLoginData {
  provider: 'google' | 'apple';
  token: string;
  userType: 'garage_owner' | 'car_owner';
}

export interface SendEmailOtpData {
  email: string;
}

export interface LoginResponse {
  token: {
    access: {
      token: string;
    };
    refresh: {
      token: string;
    };
  };
}
