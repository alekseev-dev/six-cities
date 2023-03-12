import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';

type OfferListProps = {
  offers: Offers;
  onOfferCardHover: (id: string | undefined) => void;
}

function OfferList(props: OfferListProps): JSX.Element {
  const {offers, onOfferCardHover} = props;


  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => {

        const keyValue = `${offer.id}-${offer.previewImage}`;
        return (
          <OfferCard
            key={keyValue}
            offer={offer}
            onOfferCardHover={onOfferCardHover}
          />
        );
      })}
    </div>
  );
}

export default OfferList;
