import {shallowEqual, useSelector} from 'react-redux';

import {useActionCreator} from 'hooks';
import {RootState} from 'store/types';
import {AuthHookReturn} from './types';
import {
  setError,
  signUp,
  logIn,
  socialLogIn,
  socialSignup,
  sendEmailOtp,
  forgotPassword,
  verifyOtp,
  setAccessToken,
  logOut,
  setFormData,
} from './actions';

export const useAuth = (): AuthHookReturn => {
  const authState = useSelector((state: RootState) => state.auth, shallowEqual);

  return {
    ...authState,
    setError: useActionCreator(setError),
    setAccessToken: useActionCreator(setAccessToken),
    signUp: useActionCreator(signUp),
    logIn: useActionCreator(logIn),
    socialLogIn: useActionCreator(socialLogIn),
    socialSignup: useActionCreator(socialSignup),
    sendEmailOtp: useActionCreator(sendEmailOtp),
    forgotPassword: useActionCreator(forgotPassword),
    verifyOtp: useActionCreator(verifyOtp),
    logOut: useActionCreator(logOut),
    setFormData: useActionCreator(setFormData),
  };
};
