import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivateRouteLoginProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRouteLogin(props: PrivateRouteLoginProps): JSX.Element {

  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Root} />
      : children
  );
}

export default PrivateRouteLogin;
