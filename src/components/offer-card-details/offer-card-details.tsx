import { Offer } from '../../types/offer';
import FavoriteButton, { favoriteButtonBig } from '../favorite-button/favorite-button';
import OfferCardDetailsReviews from './offer-card-details-reviews/offer-card-details-reviews';
import OfferCardDetailsPropGallery from './offer-card-details-prop-gallery/offer-card-details-prop-gallery';
import { converRatingToStars } from '../../utils/utils';

type OfferCardDetailsProps = {
  offer: Offer | Record<string, never>;
}

function OfferCardDetails({offer}: OfferCardDetailsProps): JSX.Element {
  const {
    id,
    images,
    isPremium,
    isFavorite,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
  } = offer;

  return (
    <>
      <OfferCardDetailsPropGallery
        images={images}
      />
      <div className="property__container container">
        <div className="property__wrapper">
          {isPremium
            ?
            <div className="property__mark">
              <span>Premium</span>
            </div>
            : ''}
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {title}
            </h1>
            <FavoriteButton
              id={id}
              isFavorite={isFavorite}
              overrides={favoriteButtonBig}
            />
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span
                style={{width: `${converRatingToStars(rating)}%`}}
              >
              </span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span
              className="property__rating-value rating__value"
            >
              {offer.rating}
            </span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b
              className="property__price-value"
            >&euro;{price}
            </b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {goods.map((good, i) => (
                <li
                  key={`${good + i.toString()}`}
                  className="property__inside-item"
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div
                className={`property__avatar-wrapper
                ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
              >
                <img
                  className="property__avatar user__avatar"
                  src={host.avatarUrl}
                  width="74"
                  height="74"
                  alt="Host avatar"
                />
              </div>
              <span className="property__user-name">
                {host.name}
              </span>
              {host.isPro && <span className="property__user-status">Pro</span>}
            </div>
            <div className="property__description">
              <p className="property__text">
                {description}
              </p>
            </div>
          </div>
          <OfferCardDetailsReviews />
        </div>
      </div>
    </>
  );
}

export default OfferCardDetails;
