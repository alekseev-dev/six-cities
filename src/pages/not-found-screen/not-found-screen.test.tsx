import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundScreen from './not-found-screen';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { AuthorizationStatus, CitiesNames } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockUserData = makeFakeUserData();

const store = mockStore({
  user: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: mockUserData,
  },
  app: {
    currentCity: CitiesNames.Paris,
  }
});
describe('Comonent: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <NotFoundScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getByText('Page not found');

    expect(headerElement).toBeInTheDocument();
  });
});
