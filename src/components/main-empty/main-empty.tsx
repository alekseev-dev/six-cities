import { Helmet } from 'react-helmet-async';
import { CitiesNames } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCurrentCity } from '../../store/app-process/selectors';
import Header from '../header/header';
import LocationItem from '../location-item/location-item';


function MainScreenEmpty(): JSX.Element {
  const cities = useAppSelector(getCurrentCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities. Main</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
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
      </main>
    </div>
  );
}

export default MainScreenEmpty;
