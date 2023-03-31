import { CitiesNames } from '../../const';
import { Offer, Offers } from '../../types/offer';
import FavoritesLocationItems from '../favorites-location-items/favorites-location-items';

type FavoritesLocationListProps = {
  offers: Offers;
}

function FavoritesLocationList({offers}: FavoritesLocationListProps): JSX.Element {
  const filteredCities = offers.reduce((acc: CitiesNames[], offer: Offer) => {
    if (acc.find((accItem) => accItem === offer.city.name)) {
      return acc;
    }

    return [...acc, offer.city.name];
  }, []);

  const getOffersByFavorites = (city: CitiesNames) => offers.filter((offer) => offer.city.name === city);

  return (
    <ul className="favorites__list">
      {filteredCities.map((city) => (
        <FavoritesLocationItems
          key={city}
          offers={getOffersByFavorites(city)}
        />
      ))}
    </ul >
  );
}

export default FavoritesLocationList;

