import { Helmet } from 'react-helmet-async';
import Cities from '../../components/cities/cities';
import {CitiesNames} from '../../const';
import LocationItem from '../../components/location-item/location-item';
import Header from '../../components/header/header';


function MainScreen(): JSX.Element {

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 Cities. Main</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
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
        <Cities />
      </main>
    </div>
  );
}

export default MainScreen;
