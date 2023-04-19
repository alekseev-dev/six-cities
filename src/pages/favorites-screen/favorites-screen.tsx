import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FavoritesLocationList from '../../components/favorites-location-list/favorites-location-list';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesOffersAction } from '../../store/api-actions';
import { dataProcessActions } from '../../store/data-process/data-process';
import { getFavoritesOffers } from '../../store/data-process/selectors';


function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getFavoritesOffers);
  const isEmpty = offers.length > 0;

  useEffect(() => {
    dispatch(fetchFavoritesOffersAction());

    return () => {
      dispatch(dataProcessActions.cleanUpfavoritesOffersInStore());
    };
  }, [dispatch]);

  return (
    <div className={`page ${isEmpty ? 'page--favorites-empty' : ''}`}>
      <Helmet>
        <title>6 Cities. Favorites</title>
      </Helmet>
      <Header />

      {isEmpty ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesLocationList
                offers={offers}
              />
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;


