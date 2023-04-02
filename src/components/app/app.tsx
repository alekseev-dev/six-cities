import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import PrivateRouteFavorites from '../private-route-favorites/private-route-favorites';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import PrivateRouteLogin from '../private-route-login/private-route-login';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getDataStatus } from '../../store/data-process/selectors';
import MainScreen from '../main-screen/main-screen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getDataStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading === Status.Loading) {
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
                <FavoritesScreen />
              </PrivateRouteFavorites>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={
              <OfferScreen />
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
