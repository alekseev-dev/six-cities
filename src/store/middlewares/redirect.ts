import browserHistory from '../../browser-history';
import { reducer } from '../reducer';
import { Middleware} from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';

type Reducer = ReturnType<typeof reducer>

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'city/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };