import {ThunkAction} from '@reduxjs/toolkit';

import rootReducer from './reducers';

type RootReducer = typeof rootReducer;

export type RootState = ReturnType<RootReducer>;

export type Actions = Parameters<RootReducer>[1];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Actions
>;
