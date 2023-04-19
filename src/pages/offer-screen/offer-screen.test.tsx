import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus, CitiesNames, NameSpace, SortType, Status } from '../../const';
import { api } from '../../store';
import { redirect } from '../../store/middlewares/redirect';
import { makeFakeComments, makeFakeOffer, makeFakeOffers, makeFakeUserData } from '../../utils/mocks';
import OfferScreen from './offer-screen';
import thunk from 'redux-thunk';

const mockOffer = makeFakeOffer();
const mockUserData = makeFakeUserData();
const mockOffers = makeFakeOffers();
const mockOfferReviews = makeFakeComments();

const middlewares = [thunk.withExtraArgument(api), redirect];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Data]: {
    offerList: mockOffers,
    currentSortType: SortType.Popular,
    offerReviews: mockOfferReviews,
    submitReviewStatus: Status.Success,
    openedOfferCard: mockOffer,
    offersNearby: mockOffers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: mockUserData,
  },
  [NameSpace.App]: {
    currentCity: CitiesNames.Paris,
    activeOfferCard: mockOffer,
  },
});

const history = createMemoryHistory();

describe('Component: OfferScreen', () => {
  it('should render correctly when offers are loaded', () => {
    history.push(AppRoute.Offer);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Offer}
                element={
                  <OfferScreen />
                }
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    const commonLengthOfMarkers = mockOffers.length + Number(Boolean(mockOffer));


    expect(screen.getByAltText(/6 cities/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('favorite-button')[0]).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getAllByAltText(/Marker/i)).toHaveLength(commonLengthOfMarkers);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render correctly', () => {
    history.push(AppRoute.Offer);

    store.getState()[NameSpace.Data] = {
      submitReviewStatus: Status.Loading,
    };

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Offer}
                element={
                  <OfferScreen />
                }
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
