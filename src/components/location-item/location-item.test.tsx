import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { CitiesNames, NameSpace } from '../../const';
import HistoryRouter from '../history-route/history-route';
import LocationItem from './location-item';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.App]: {
    currentCity: CitiesNames.Amsterdam,
  }
});

describe('Component: LocationItem', () => {
  it('should render correctly and on button add active class', async () => {
    const {rerender} = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={
                <LocationItem
                  city={CitiesNames.Paris}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(CitiesNames.Paris)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('pagination-city'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('app/chooseCity');
    expect(actions[1].type).toBe('data/setSortType');

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path='/'
              element={
                <LocationItem
                  city={CitiesNames.Amsterdam}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(CitiesNames.Amsterdam)).toBeInTheDocument();
    expect(screen.getByTestId('pagination-city')).toHaveClass('tabs__item--active');
  });
});
