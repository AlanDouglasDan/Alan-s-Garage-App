import {combineReducers} from '@reduxjs/toolkit';

import authReducer from './auth/reducers';
import userReducer from './user/reducers';
import businessReducer from './business/reducers';
import requestReducer from './request/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  business: businessReducer,
  request: requestReducer,
});

export default rootReducer;
