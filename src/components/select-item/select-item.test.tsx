import { render, screen } from '@testing-library/react';
import { SortType } from '../../const';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import SelectItem from './select-item';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Component: SelectItem', () => {
  it('should render component correctly', async () => {
    const type = SortType.Popular;
    const currentSortType = jest.fn();
    const setOpenSelect = jest.fn();

    render(
      <Provider store={store}>
        <SelectItem
          type={type}
          currentSortType={currentSortType}
          setOpenSelect={setOpenSelect}
        />
      </Provider>
    );

    expect(screen.getByText(type)).toBeInTheDocument();
    expect(currentSortType).not.toBeCalled();
    expect(setOpenSelect).not.toBeCalled();

    await userEvent.click(screen.getByText(type));

    expect(currentSortType).toBeCalled();
    expect(setOpenSelect).toBeCalled();

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/setSortType');
  });
});
