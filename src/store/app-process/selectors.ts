import { CitiesNames, NameSpace } from '../../const';
import { activeOffer } from '../../types/offer';
import { rootState } from '../../types/state';


export const getCurrentCity = (state: rootState): CitiesNames => state[NameSpace.App].currentCity;
export const getActiveOfferCard = (state: rootState): activeOffer | null => state[NameSpace.App].activeOfferCard;
