import { Offer } from '../../types/offer';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, OfferCardType } from '../../const';
import FavoriteButton, { favoriteButtonSmall } from '../favorite-button/favorite-button';
import { useAppDispatch } from '../../hooks';
import { appProcessActions } from '../../store/app-process/app-process';
import { converRatingToStarsToRound } from '../../utils/utils';
import React from 'react';

type OfferCardProps = {
  offer: Offer;
  cardType: OfferCardType;
  imageWidth: string;
  imageHeight: string;
  hightLightPins: boolean;
};

function OfferCard({offer, cardType, imageWidth, imageHeight, hightLightPins}: OfferCardProps): JSX.Element {
  const { isPremium, rating, isFavorite, previewImage, price, title, type, id, location } = offer;

  const offerPath = generatePath(`${AppRoute.Offer}/:id`, {id: id.toString()});
  const dispatch = useAppDispatch();

  const selectCardTypeClass = cardType === OfferCardType.PlaceCard
    ? OfferCardType.PlaceCard
    : OfferCardType.FavoritesCard;


  const handleMouseEnter = () => {
    if (cardType === OfferCardType.PlaceCard && hightLightPins) {
      dispatch(appProcessActions.activeOfferCard({location, id}));
    }
  };

  const handleMouseLeave = () => {
    if (cardType === OfferCardType.PlaceCard && hightLightPins) {
      dispatch(appProcessActions.activeOfferCard(null));
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${cardType === OfferCardType.FavoritesCard ? 'favorites__card' : 'cities__place-card'}  place-card`}
      data-testid='offer-card'
    >
      {OfferCardType.PlaceCard && isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div className={`${selectCardTypeClass}__image-wrapper place-card__image-wrapper`}>
        <Link
          to={offerPath}
        >
          <img
            className="place-card__image"
            src={previewImage}
            width={imageWidth}
            height={imageHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${OfferCardType.FavoritesCard ? 'favorites__card-info' : ''} place-card__info`}>
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
            <span style={{ width: converRatingToStarsToRound(rating) }}></span>
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

export default React.memo(OfferCard);
