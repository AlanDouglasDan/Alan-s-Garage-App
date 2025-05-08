import {shallowEqual, useSelector} from 'react-redux';

import {useActionCreator} from 'hooks';
import {RootState} from 'store/types';
import {UserHookReturn} from './types';
import {
  setError,
  updateProfile,
  updateLocation,
  getProfile,
  changePassword,
  updatePhone,
  verifyPhone,
  getCarRecords,
  getNotifications,
  deleteAccount,
} from './actions';

export const useUser = (): UserHookReturn => {
  const userState = useSelector((state: RootState) => state.user, shallowEqual);

  return {
    ...userState,
    setError: useActionCreator(setError),
    updateProfile: useActionCreator(updateProfile),
    updateLocation: useActionCreator(updateLocation),
    getProfile: useActionCreator(getProfile),
    changePassword: useActionCreator(changePassword),
    updatePhone: useActionCreator(updatePhone),
    verifyPhone: useActionCreator(verifyPhone),
    getCarRecords: useActionCreator(getCarRecords),
    getNotifications: useActionCreator(getNotifications),
    deleteAccount: useActionCreator(deleteAccount),
  };
};
