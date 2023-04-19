import { CitiesNames, NameSpace } from '../../const';
import { ActiveOffer } from '../../types/offer';
import { rootState } from '../../types/state';


export const getCurrentCity = (state: rootState): CitiesNames => state[NameSpace.App].currentCity;
export const getActiveOfferCard = (state: rootState): ActiveOffer | null => state[NameSpace.App].activeOfferCard;
