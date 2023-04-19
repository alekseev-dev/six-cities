import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppRoute, NameSpace, Status } from '../../../const';
import ReviewsForm from './reviews-form';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../history-route/history-route';
import { createMemoryHistory } from 'history';
import { generatePath } from 'react-router-dom';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Data]: {
    submitReviewStatus: Status.Idle
  }
});

const id = '1';
const mockComment = 'What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!';

describe('Component: ReviewsForm', () => {
  it('should render correctly', async () => {
    history.push(generatePath(`${AppRoute.Offer}/:id`, {id: id}));

    const {rerender} = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm />
        </HistoryRouter>
      </Provider>
    );


    expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Submit/i})).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('comment-textarea'), mockComment);
    await userEvent.click(screen.getAllByTestId('star')[2]);

    expect(screen.getByDisplayValue(mockComment)).toBeInTheDocument();
    expect(screen.getAllByTestId('star')[2]).toBeChecked();

    await userEvent.click(screen.getByRole('button', {name: /Submit/i}));

    rerender(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewsForm />
        </HistoryRouter>
      </Provider>
    );
  });
});
