import { Helmet } from 'react-helmet-async';
import Cities from '../../components/cities/cities';
import {CitiesNames} from '../../const';
import LocationItem from '../../components/location-item/location-item';
import Header from '../../components/header/header';
import { getOfferList } from '../../store/data-process/selectors';
import { getCurrentCity } from '../../store/app-process/selectors';
import { useAppSelector } from '../../hooks';


function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOfferList);
  const cities = useAppSelector(getCurrentCity);
  const isEmpty = offers.length === 0;

  return (
    <div className="page page--gray page--main ">
      <Helmet>
        <title>6 Cities. Main</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {(Object.values(CitiesNames) as CitiesNames[]).map((city) => (
                <LocationItem
                  key={city}
                  city={city}
                />
              ))}
            </ul>
          </section>
        </div>
        {isEmpty ? (
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {cities}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>
        ) : (
          <Cities />
        )}
      </main>
    </div>
  );
}

export default MainScreen;
