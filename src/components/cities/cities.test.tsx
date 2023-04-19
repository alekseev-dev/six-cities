import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, CitiesNames, NameSpace, SortType } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import Cities from './cities';

const mockStore = configureMockStore();
const mockOffers = makeFakeOffers();

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
  }
});

const history = createMemoryHistory();

describe('Component: Cities', () => {
  jest.mock('../../store/data-process/selectors', () => ({
    selectOffersByFilter: jest.fn()
  }));

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Cities />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/places to stay in/i)).toBeInTheDocument();
    expect(screen.getByTestId('sort-form')).toBeInTheDocument();
    expect(screen.getAllByTestId('offer-card')[0]).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
