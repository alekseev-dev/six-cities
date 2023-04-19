import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationItem from '../../components/location-item/location-item';
import { CitiesNames } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {(Object.values(CitiesNames)).map((city) => (
                <LocationItem
                  key={city}
                  city={city}
                />
              ))}
            </ul>
          </section>
        </div>
        <section className="not-found">
          <h1 className='not-found__text'>Page not found</h1>
        </section>
      </main>
    </div>
  );
}

export default NotFoundScreen;
