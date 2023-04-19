import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, OfferCardType, NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import OfferCard from './offer-card';

const mockOffer = makeFakeOffer();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: OfferCard', () => {
  it('should render correctly and onMouseEnter/onMouseLeave works with "OfferCardType.PlaceCard"', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <OfferCard
                  offer={mockOffer}
                  cardType={OfferCardType.PlaceCard}
                  imageWidth='260'
                  imageHeight='200'
                  hightLightPins
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('offer-card'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('app/activeOfferCard');

    fireEvent.mouseLeave(screen.getByTestId('offer-card'));

    expect(actions[1].type).toBe('app/activeOfferCard');
    expect(actions[1].payload).toBeNull();
  });

  it('should render correctly with "OfferCardType.FavoritesCard"', () => {
    const store = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={
                <OfferCard
                  offer={mockOffer}
                  cardType={OfferCardType.FavoritesCard}
                  imageWidth='160'
                  imageHeight='100'
                  hightLightPins={false}
                />
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();

    fireEvent.mouseEnter(screen.getByTestId('offer-card'));

    const actions = store.getActions();

    expect(actions).toHaveLength(0);
  });
});
