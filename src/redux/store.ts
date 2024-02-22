import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AuthReducer from './authSlice';

const reducers = combineReducers({
  auth: AuthReducer,
});

export const store = configureStore({reducer: reducers});
