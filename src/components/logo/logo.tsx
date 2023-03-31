import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  return (
    <Link className="header__logo-link" to={AppRoute.Root}>
      <img className="header__logo" src='img/logo.svg' width="81" height="41" />
    </Link>
  );
}

export default Logo;
