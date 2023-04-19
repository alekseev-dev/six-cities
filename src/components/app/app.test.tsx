import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import thunk from 'redux-thunk';
import { AppRoute, AuthorizationStatus, CitiesNames, NameSpace, SortType, Status } from '../../const';
import { createAPI } from '../../services/api';
import { rootState } from '../../types/state';
import { makeFakeComments, makeFakeOffer, makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';


const api = createAPI();
const middleware = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  rootState,
  Action<string>,
  ThunkDispatch<rootState, typeof api, Action>
>(middleware);


const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: makeFakeUserData(),
  },
  [NameSpace.Data]: {
    dataStatus: Status.Success,
    offerList: makeFakeOffers(),
    currentSortType: SortType.Popular,
    favoritesOffers: [],
    openedOfferCard: makeFakeOffer({id: 3}),
    offerReviews: makeFakeComments(),
    offersNearby: makeFakeOffers(),
  },
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris
  }
});

const history = createMemoryHistory();
const state = store.getState();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth
    };

    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Sign in'})).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    state[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: makeFakeUserData(),
    };

    history.push(AppRoute.Favorites);

    render(fakeApp);

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render "OfferScreen" when user navigate to "/offer"', () => {
    history.push(generatePath(`${AppRoute.Offer}/:id`, {id: '3'}));

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to some othen link', () => {
    history.push('/someOthenLink');

    render(fakeApp);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
