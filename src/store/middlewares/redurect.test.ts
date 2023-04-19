import { redirect } from './redirect';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { rootState } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../const';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  }
};

jest.mock('../../browser-history', () => fakeHistory);

const middleware = [redirect];
const mockStore = configureMockStore<rootState, AnyAction>(middleware);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });
  it('should redirect to /login page if', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login)
    ]);
  });

  it('should not redirect to /favorites', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Favorites});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Favorites);
  });
});


