import {shallowEqual, useSelector} from 'react-redux';

import {useActionCreator} from 'hooks';
import {RootState} from 'store/types';
import {BusinessHookReturn} from './types';
import {
  setError,
  createBusiness,
  updateBusiness,
  saveSchedule,
  getSchedule,
  getBusiness,
  getServices,
  stripeOnboard,
  addGarage,
  getGarages,
  updateGarage,
} from './actions';

export const useBusiness = (): BusinessHookReturn => {
  const businessState = useSelector(
    (state: RootState) => state.business,
    shallowEqual,
  );

  return {
    ...businessState,
    setError: useActionCreator(setError),
    createBusiness: useActionCreator(createBusiness),
    updateBusiness: useActionCreator(updateBusiness),
    saveSchedule: useActionCreator(saveSchedule),
    getSchedule: useActionCreator(getSchedule),
    getBusiness: useActionCreator(getBusiness),
    getServices: useActionCreator(getServices),
    stripeOnboard: useActionCreator(stripeOnboard),
    addGarage: useActionCreator(addGarage),
    getGarages: useActionCreator(getGarages),
    updateGarage: useActionCreator(updateGarage),
  };
};
