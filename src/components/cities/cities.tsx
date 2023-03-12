import { City, Location, Offer, Offers } from '../../types/offer';
import Map from '../map/Map';
import OfferList from '../offer-list/offer-list';
import { useState } from 'react';

type CitiesProps = {
  offers: Offers;
  currentCity: string;
}

function Cities({offers, currentCity}: CitiesProps):JSX.Element {

  const [selectedPin, setSelectedPin] = useState<Offer | undefined>(undefined);

  const onOfferCardHover = (pinId: string | undefined):void => {
    const currentPin = offers.find((offer) => offer.id === pinId);

    setSelectedPin(currentPin);
  };

  const getOffersNumber = () => `${offers.length} places to stay in ${currentCity}`;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{getOffersNumber()}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
                  Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <OfferList
            offers={offers}
            onOfferCardHover={onOfferCardHover}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              offers={offers}
              selectedPin={selectedPin}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
