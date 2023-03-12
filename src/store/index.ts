import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { reducer } from './reducer';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDeaultMiddleware) =>
    getDeaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
