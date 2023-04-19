import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import { useAppDispatch} from '../../hooks/index';
import { AppRoute, CitiesNames } from '../../const';
import { appProcessActions } from '../../store/app-process/app-process';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import { useCallback } from 'react';


function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const getRandomCity = useCallback(() => {
    const cities = Object.values(CitiesNames);
    const randomIndex = Math.floor(Math.random() * (cities.length));
    return cities[randomIndex];
  }, []);

  const randomCity = getRandomCity();

  const onCityClick = () => {
    dispatch(appProcessActions.chooseCity(randomCity));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities. Login</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                data-testid='random-city'
              >
                <span
                  onClick={onCityClick}
                >{randomCity}
                </span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
