import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDeaultMiddleware) =>
    getDeaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    }).concat(redirect),
});
