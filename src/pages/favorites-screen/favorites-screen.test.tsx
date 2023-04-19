import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus, CitiesNames, NameSpace, Status } from '../../const';
import { redirect } from '../../store/middlewares/redirect';
import { makeFakeOffer, makeFakeUserData } from '../../utils/mocks';
import FavoritesScreen from './favorites-screen';
import thunk from 'redux-thunk';
import { api } from '../../store';

const history = createMemoryHistory();
const mockOffers = [
  makeFakeOffer(
    {
      city: {
        name: CitiesNames.Dusseldorf
      }
    }),
  makeFakeOffer()
];
const mockUserData = makeFakeUserData();

const middlewares = [thunk.withExtraArgument(api), redirect];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris,
  },
  [NameSpace.Data]: {
    dataStatus: Status.Success,
    offerList: mockOffers,
    favoritesOffers: mockOffers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: mockUserData,
  },
});

describe('Component: FavoritesScreen', () => {
  it('should render correctly if favoritesOffers is exist', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FavoritesScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Dusseldorf'})).toBeInTheDocument();
  });

  it('should render correctly if favoritesOffers is empty', () => {
    store.getState()[NameSpace.Data] = {
      offerList: mockOffers,
      favoritesOffers: [],
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <FavoritesScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
