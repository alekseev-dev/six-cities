import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  routeType: AppRoute;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, routeType, children} = props;

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  if (isAuth && routeType === AppRoute.Root) {
    return <Navigate to={AppRoute.Root} />;
  }

  if (!isAuth && routeType === AppRoute.Favorites) {
    return <Navigate to={AppRoute.Login} />;
  }

  return children;
}

export default PrivateRoute;
