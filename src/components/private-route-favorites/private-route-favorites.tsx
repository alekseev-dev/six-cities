import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteFavoritesProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRouteFavorites(props: PrivateRouteFavoritesProps): JSX.Element {

  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRouteFavorites;
