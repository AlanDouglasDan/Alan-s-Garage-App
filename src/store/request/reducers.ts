import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';

import {RequestState} from './types';
import {
  setError,
  submitBid,
  getRequests,
  getBids,
  getBid,
  updateBidStatus,
  createAdditionalRepair,
} from './actions';

const initialState: RequestState = {
  loading: false,
  error: false,
  requests: undefined,
  bids: undefined,
  bid: undefined,
};

const businessStore = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<RequestState>) => {
    builder.addCase(setError, (state, {payload}) => {
      state.error = payload;
    });

    builder.addCase(getRequests.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.requests = payload.data;
    });

    builder.addCase(getBids.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.bids = payload.data;
    });

    builder.addCase(getBid.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.bid = payload.data;
    });

    builder.addMatcher(
      isAnyOf(
        submitBid.fulfilled,
        updateBidStatus.fulfilled,
        createAdditionalRepair.fulfilled,
      ),
      state => {
        state.loading = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        getRequests.pending,
        submitBid.pending,
        getBids.pending,
        updateBidStatus.pending,
        getBid.pending,
        createAdditionalRepair.pending,
      ),
      state => {
        state.loading = true;
        state.error = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        getRequests.rejected,
        submitBid.rejected,
        getBids.rejected,
        updateBidStatus.rejected,
        getBid.rejected,
        createAdditionalRepair.rejected,
      ),
      (state, {error}) => {
        state.loading = false;
        state.error = error?.message || true;
      },
    );
  },
});

export default businessStore.reducer;
