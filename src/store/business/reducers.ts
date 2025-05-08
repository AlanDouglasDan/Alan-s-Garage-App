import {ActionReducerMapBuilder, createSlice, isAnyOf} from '@reduxjs/toolkit';

import {BusinessState} from './types';
import {
  setError,
  getBusiness,
  createBusiness,
  updateBusiness,
  saveSchedule,
  getSchedule,
  getServices,
  stripeOnboard,
  addGarage,
  updateGarage,
  getGarages,
} from './actions';

const initialState: BusinessState = {
  loading: false,
  loading2: false,
  error: false,
  business: undefined,
  schedule: undefined,
  services: undefined,
  garages: undefined,
};

const businessStore = createSlice({
  name: 'business',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<BusinessState>) => {
    builder.addCase(setError, (state, {payload}) => {
      state.error = payload;
    });

    builder.addCase(getBusiness.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.business = payload.data;
    });

    builder.addCase(getSchedule.fulfilled, (state, {payload}) => {
      state.loading2 = false;
      state.schedule = payload.data;
    });

    builder.addCase(getServices.fulfilled, (state, {payload}) => {
      state.loading2 = false;
      state.services = payload.data;
    });

    builder.addCase(getGarages.fulfilled, (state, {payload}) => {
      state.loading2 = false;
      state.garages = payload.data;
    });

    builder.addMatcher(
      isAnyOf(
        createBusiness.fulfilled,
        saveSchedule.fulfilled,
        updateBusiness.fulfilled,
        stripeOnboard.fulfilled,
        addGarage.fulfilled,
        updateGarage.fulfilled,
      ),
      state => {
        state.loading = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        createBusiness.pending,
        updateBusiness.pending,
        getBusiness.pending,
        saveSchedule.pending,
        stripeOnboard.pending,
        addGarage.pending,
        updateGarage.pending,
      ),
      state => {
        state.loading = true;
        state.error = false;
      },
    );

    builder.addMatcher(
      isAnyOf(getSchedule.pending, getServices.pending, getGarages.pending),
      state => {
        state.loading2 = true;
        state.error = false;
      },
    );

    builder.addMatcher(
      isAnyOf(
        createBusiness.rejected,
        updateBusiness.rejected,
        getBusiness.rejected,
        saveSchedule.rejected,
        stripeOnboard.rejected,
        addGarage.rejected,
        updateGarage.rejected,
      ),
      (state, {error}) => {
        state.loading = false;
        state.error = error?.message || true;
      },
    );

    builder.addMatcher(
      isAnyOf(getSchedule.rejected, getServices.rejected, getGarages.rejected),
      (state, {error}) => {
        state.loading2 = false;
        state.error = error?.message || true;
      },
    );
  },
});

export default businessStore.reducer;
