import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FavoritesLocationItems from './favorites-location-items';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth
  }
});
const history = createMemoryHistory();
const mockOffers = makeFakeOffers();

describe('Component: FavoritesLocationItems', () => {
  it('should render correctly', async () => {
    history.push(AppRoute.Favorites);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={
                <FavoritesLocationItems
                  offers={mockOffers}
                />
              }
            />
            <Route
              path={AppRoute.Root}
              element={<h1>Root Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockOffers[0].city.name)).toBeInTheDocument();
    expect(screen.getAllByText(/night/i)[0]).toBeInTheDocument();

    await userEvent.click(screen.getByText(mockOffers[1].city.name));

    const actions = store.getActions();

    expect(actions[0].type).toBe('app/chooseCity');
    expect(actions[1].type).toBe('data/setSortType');

    expect(screen.getByText(/Root Screen/i)).toBeInTheDocument();
  });
});
