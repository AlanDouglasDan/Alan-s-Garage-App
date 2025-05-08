import {configureStore, EnhancedStore, Middleware} from '@reduxjs/toolkit';

import rootReducer from './reducers';
import {Actions, RootState} from './types';

declare const module: any;

const configureAppStore = (
  preloadedState?: RootState,
): EnhancedStore<RootState, Actions> => {
  const devMiddlewares: Middleware[] = [];

  if (process.env.NODE_ENV === 'development') {
    const {logger} = require('redux-logger');

    devMiddlewares.push(logger);
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(devMiddlewares),
    preloadedState,
    // enhancers: [],
    devTools: __DEV__,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export const store = configureAppStore();
