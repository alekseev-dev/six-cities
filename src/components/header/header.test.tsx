import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, CitiesNames, NameSpace, SortType } from '../../const';
import { makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Header from './header';

const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();
const mockUserData = makeFakeUserData();

const store = mockStore({
  [NameSpace.Data]: {
    offerList: mockOffers,
    currentSortType: SortType.Popular,
  },
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  }
});

const history = createMemoryHistory();

describe('Component: FavoritesLocationItems', () => {

  it('should render correctly when user is not Auth', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/6 cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when user is Auth', () => {
    store.getState()[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByAltText(/6 cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
