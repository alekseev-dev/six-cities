import { Offer } from '../../types/offer';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, mapType } from '../../const';
import FavoriteButton, { favoriteButtonSmall } from '../favorite-button/favorite-button';
import { converRatingToStars } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { appProcessActions } from '../../store/app-process/app-process';

type OfferCardProps = {
  offer: Offer;
  typeOfMap: mapType;
};

function OfferCard({offer, typeOfMap}: OfferCardProps): JSX.Element {
  const { isPremium, rating, isFavorite, previewImage, price, title, type, id, location } = offer;

  const offerPath = generatePath(`${AppRoute.Offer}/:id`, {id: id.toString()});
  const dispatch = useAppDispatch();

  const handleMouseEnter = () => {
    if (typeOfMap === mapType.OnMainScreen) {
      dispatch(appProcessActions.activeOfferCard({location, id}));
    }
  };

  const handleMouseLeave = () => {
    if (typeOfMap === mapType.OnMainScreen) {
      dispatch(appProcessActions.activeOfferCard(null));
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cities__place-card place-card"
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link
          to={offerPath}
        >
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            id={id}
            isFavorite={isFavorite}
            overrides={favoriteButtonSmall}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: converRatingToStars(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={offerPath}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
