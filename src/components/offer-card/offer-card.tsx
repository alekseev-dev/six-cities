import { Offer } from '../../types/offer';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import FavoriteButton, { favoriteButtonSmall } from '../favorite-button/favorite-button';
import { converRatingToStars } from '../../utils';

type OfferCardProps = {
  offer: Offer;
  onOfferCardHover?: (id: number | null) => void;
};

function OfferCard({offer, onOfferCardHover}: OfferCardProps): JSX.Element {
  const { isPremium, rating, isFavorite, previewImage, price, title, type, id } = offer;

  const offerPath = generatePath(`${AppRoute.Offer}/:id`, {id: id.toString()});

  const offerCardHandler = (value: number | null) => {
    if (!onOfferCardHover) {
      return;
    }
    onOfferCardHover(value);
  };

  return (
    <article
      onMouseEnter={() => offerCardHandler(id)}
      onMouseLeave={() => offerCardHandler(null)}
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
