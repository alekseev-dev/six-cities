import { Offers } from '../../types/offer';
import Map from '../map/Map';
import OfferList from '../offer-list/offer-list';
import OffersSort from '../offers-sort/offers-sort';
import { useAppSelector } from '../../hooks';
import { selectOffersByFilter } from '../../store/data-process/selectors';
import { getCurrentCity } from '../../store/app-process/selectors';

function Cities():JSX.Element {
  const sortedOffers = useAppSelector(selectOffersByFilter) as Offers;
  const currentCity = useAppSelector(getCurrentCity);

  const getOffersNumber = () => `${sortedOffers.length} places to stay in ${currentCity}`;

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{getOffersNumber()}</b>
          <OffersSort />
          <OfferList
            offers={sortedOffers}
          />
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              offers={sortedOffers}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
