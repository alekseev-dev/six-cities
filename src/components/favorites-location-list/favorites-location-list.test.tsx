import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FavoritesLocationList from './favorites-location-list';


const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});
const history = createMemoryHistory();
const mockOffers = makeFakeOffers();
describe('Component: FavoritesLocationItems', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesLocationList
            offers={mockOffers}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffers[0].city.name)).toBeInTheDocument();
    expect(screen.getAllByText(/night/i)[0]).toBeInTheDocument();
  });
});
