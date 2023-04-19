import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CitiesNames, NameSpace, SortType } from '../../const';
import OffersSort from './offers-sort';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris,
  },
  [NameSpace.Data]: {
    currentSortType: SortType.Popular,
  }
});


describe('Component: OffersSort', () => {
  it('should render correctly and select menu is open/close', async () => {
    const {rerender} = render(
      <Provider store={store}>
        <OffersSort />
      </Provider>
    );

    expect(screen.getByTestId('sort-form')).toBeInTheDocument();
    expect(screen.getByTestId('current-sort-type')).toBeInTheDocument();
    expect(screen.getByTestId('sort-list')).toBeInTheDocument();

    expect(screen.queryByTestId('sort-list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('current-sort-type'));

    rerender(
      <Provider store={store}>
        <OffersSort />
      </Provider>
    );

    expect(screen.getByTestId('sort-list')).toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('current-sort-type'));

    rerender(
      <Provider store={store}>
        <OffersSort />
      </Provider>
    );

    expect(screen.queryByTestId('sort-list')).not.toHaveClass('places__options--opened');
  });
});
