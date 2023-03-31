import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offer';
import FavoriteButton, { favoriteButtonSmall } from '../favorite-button/favorite-button';

type FavoritesLocationItemProps = {
  offer: Offer;
}


function FavoritesLocationItem({ offer }: FavoritesLocationItemProps): JSX.Element {
  const { isFavorite, id ,previewImage, price, title, type} = offer;

  const offerPath = generatePath(`${AppRoute.Offer}/:id`, {id: id.toString()});

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerPath}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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
            <span style={{ width: '100%' }}></span>
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

export default FavoritesLocationItem;
