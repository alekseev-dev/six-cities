import { Offer } from '../../../types/offer';

type OfferCardDetailsPropGalleryProps = Pick<Offer, 'images'>;

function OfferCardDetailsPropGallery({images}: OfferCardDetailsPropGalleryProps): JSX.Element {

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, 6).map((picture) => {
          const keyValue = `${picture}`;
          return (
            <div
              key={keyValue}
              className="property__image-wrapper"
            >
              <img
                className="property__image"
                src={picture} alt="Photo studio"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfferCardDetailsPropGallery;
