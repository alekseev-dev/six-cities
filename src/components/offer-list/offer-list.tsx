import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { mapType } from '../../const';

type OfferListProps = {
  offers: Offers;
}

function OfferList(props: OfferListProps): JSX.Element {
  const {offers} = props;

  if (offers.length === 0) {
    return (
      <div>
        «There are no places to stay available»
      </div>
    );
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {
        const keyValue = `${offer.id}-${offer.previewImage}`;
        return (
          <OfferCard
            key={keyValue}
            offer={offer}
            typeOfMap={mapType.OnMainScreen}
          />
        );
      })}
    </div>
  );
}

export default OfferList;
