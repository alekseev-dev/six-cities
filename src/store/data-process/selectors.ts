import { NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { rootState } from '../../types/state';


export const getOfferList = (state: rootState): Offers => state[NameSpace.Data].offerList;
export const getOffersDataLoading = (state: rootState): boolean => state[NameSpace.Data].isOffersDataLoading;
