import { AuthorizationStatus, CitiesNames } from '../const';
import { store } from '../store';
import { Offers } from './offer';


export type rootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
}

export type DataProcess = {
  offerList: Offers;
  isOffersDataLoading: boolean;
}

export type AppProcess = {
  currentCity: CitiesNames;
}
