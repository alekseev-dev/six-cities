import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRouteFavorites from '../private-route-favorites/private-route-favorites';
import { Offers } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import PrivateRouteLogin from '../private-route-login/private-route-login';


type AppScreenProps = {
  offers: Offers;
}

function App({offers}: AppScreenProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainScreen/>
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRouteLogin
                authorizationStatus={authorizationStatus}
              >
                <LoginScreen />
              </PrivateRouteLogin>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRouteFavorites
                authorizationStatus={authorizationStatus}
              >
                <FavoritesScreen
                  offers={offers}
                />
              </PrivateRouteFavorites>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <OfferScreen
                offer={offers[0]}
              />
            }
          />
          <Route
            path='*'
            element={<NotFoundScreen />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
