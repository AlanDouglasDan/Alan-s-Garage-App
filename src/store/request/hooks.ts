import {shallowEqual, useSelector} from 'react-redux';

import {useActionCreator} from 'hooks';
import {RootState} from 'store/types';
import {RequestHookReturn} from './types';
import {
  setError,
  submitBid,
  getRequests,
  getBids,
  getBid,
  updateBidStatus,
  createAdditionalRepair,
} from './actions';

export const useRequest = (): RequestHookReturn => {
  const requestState = useSelector(
    (state: RootState) => state.request,
    shallowEqual,
  );

  return {
    ...requestState,
    setError: useActionCreator(setError),
    submitBid: useActionCreator(submitBid),
    updateBidStatus: useActionCreator(updateBidStatus),
    getRequests: useActionCreator(getRequests),
    getBids: useActionCreator(getBids),
    getBid: useActionCreator(getBid),
    createAdditionalRepair: useActionCreator(createAdditionalRepair),
  };
};
