import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, NameSpace, Status } from '../../../const';
import { makeFakeComments } from '../../../utils/mocks';
import OfferCardDetailsReviews from './offer-card-details-reviews';


const mockStore = configureMockStore();
const mockOfferReviews = makeFakeComments();
const store = mockStore({
  [NameSpace.Data]: {
    offerReviews: mockOfferReviews,
    submitReviewStatus: Status.Idle,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: OfferCardDetailsReviews', () => {
  it('should render correctly wuth auth form when user is "Auth"', () => {
    render(
      <Provider store={store}>
        <OfferCardDetailsReviews />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/Reviews avatar/i)).toHaveLength(2);
    expect(screen.getByTestId('comment-textarea')).toBeInTheDocument();
  });

  it('should render correctly without auth form when user is "NoAuth"', () => {
    store.getState()[NameSpace.User] = {
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    render(
      <Provider store={store}>
        <OfferCardDetailsReviews />
      </Provider>
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getAllByAltText(/Reviews avatar/i)).toHaveLength(2);
    expect(screen.queryByTestId('comment-textarea')).not.toBeInTheDocument();
  });
});
