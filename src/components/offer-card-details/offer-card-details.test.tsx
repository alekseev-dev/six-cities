import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace, Status } from '../../const';
import { makeFakeComments, makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import OfferCardDetails from './offer-card-details';

const mockOffer = makeFakeOffer();
const mockOfferReviews = makeFakeComments();

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Data]: {
    offerReviews: mockOfferReviews,
    submitReviewStatus: Status.Idle,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const history = createMemoryHistory();

describe('Component: OfferCardDetails', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Offer);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Offer}
              element={
                <OfferCardDetails
                  offer={mockOffer}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByAltText('Photo studio')[0]).toBeInTheDocument();
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
