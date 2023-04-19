import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, CitiesNames, NameSpace, SortType } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import MainScreen from './main-screen';

const mockOffers = [
  makeFakeOffer(
    {
      city: {
        name: CitiesNames.Dusseldorf,
      }
    }),
  makeFakeOffer()
];
const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
  [NameSpace.Data]: {
    offerList: mockOffers,
    currentSortType: SortType.Popular,
  },
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris,
  },
});


describe('Component: MainScreen', () => {
  jest.mock('../../store/data-process/selectors', () => ({
    selectOffersByFilter: jest.fn()
  }));

  it('should render correctly if offerList not empty', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId('offer-card')[0]).toBeInTheDocument();
    expect(screen.getByText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Dusseldorf'})).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render correctly if offerList empty', () => {
    store.getState()[NameSpace.Data] = {
      offerList: [],
      currentSortType: SortType.Popular,
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <MainScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.queryByTestId('offer-card')).not.toBeInTheDocument();
  });
});
