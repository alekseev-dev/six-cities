import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { APIRoute, AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import HistoryRouter from '../history-route/history-route';
import FavoriteButton from './favorite-button';
import userEvent from '@testing-library/user-event';
import { createAPI } from '../../services/api';
import { redirect } from '../../store/middlewares/redirect';
import { rootState } from '../../types/state';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api), redirect];

const mockStore = configureMockStore<
rootState,
Action<string>,
ThunkDispatch<rootState, typeof api, Action>
>(middlewares);


const history = createMemoryHistory();

const id = 1;
const overrides = {
  name: 'place-card',
  width: '18',
  height: '19',
};

describe('Component: FavoriteButton', () => {
  it('should render correctly and on button add active class if user is "Auth"', async () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
      },
    });

    let isFavorite = false;

    const {rerender} = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <FavoriteButton
                  id={id}
                  isFavorite={isFavorite}
                  overrides={overrides}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('favorite-button'));

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${Number(!isFavorite)}`)
      .reply(200, isFavorite = true);

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={
                <FavoriteButton
                  id={id}
                  isFavorite={isFavorite}
                  overrides={overrides}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('favorite-button')).toHaveClass(`${overrides.name}__bookmark-button--active`);
  });

  it('should redirect to /login if user is "NoAuth"', async () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    const isFavorite = false;

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <FavoriteButton
                  id={id}
                  isFavorite={isFavorite}
                  overrides={overrides}
                />
              }
            />
            <Route
              path={AppRoute.Login}
              element={<h1>Login Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('favorite-button'));

    expect(screen.getByText(/Login Screen/i)).toBeInTheDocument();
  });
});
