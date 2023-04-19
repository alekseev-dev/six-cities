import { useAppDispatch } from '../../hooks';
import { Offers } from '../../types/offer';
import { appProcessActions } from '../../store/app-process/app-process';
import { Link } from 'react-router-dom';
import { AppRoute, OfferCardType, SortType } from '../../const';
import { dataProcessActions } from '../../store/data-process/data-process';
import OfferCard from '../offer-card/offer-card';

type FavoritesLocationItemsProps = {
  offers: Offers;
}

function FavoritesLocationItems({offers}: FavoritesLocationItemsProps): JSX.Element {
  const city = offers[0].city.name;
  const dispatch = useAppDispatch();

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            onClick={() => {
              dispatch(appProcessActions.chooseCity(city));
              dispatch(dataProcessActions.setSortType(SortType.Popular));
            }}
            className="locations__item-link"
            to={AppRoute.Root}
          >
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            cardType={OfferCardType.FavoritesCard}
            imageWidth='150'
            imageHeight='110'
            hightLightPins={false}
          />))}
      </div>
    </li>
  );
}

export default FavoritesLocationItems;

