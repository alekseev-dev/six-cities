import { ActiveOffer, Offers, OffersPins } from './types/offer';


export const getPinsWithActivePin = (offers: Offers, selectedPin: ActiveOffer): OffersPins[] =>
  offers.map((offer) =>
    ({...offer.location, id: offer.id})).concat({id: selectedPin.id, ...selectedPin.location});


export const getPinsWIthoutActivePin = (offers: Offers): OffersPins[] => offers.map((offer) => ({...offer.location, id: offer.id}));
