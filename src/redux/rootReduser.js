import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import authReducer from './auth/auth-slice';
import storage from 'redux-persist/lib/storage';
import { dailyRateReducer } from './dailyRate/dailyRate-slice';
import productsReducer from './diary/diary-slice';
import userReducer from './user/userSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
const userPersistConfig = {
  key: 'user',
  storage,
  blacklist: ['email', 'password', 'status'],
};
const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistUserReducer = persistReducer(userPersistConfig, userReducer);

export const rootReducer = combineReducers({
  auth: persistAuthReducer,
  dailyRate: dailyRateReducer,
  diary: productsReducer,
  user: persistUserReducer,
});
