import { AuthorizationStatus, CitiesNames, SortType, Status } from '../const';
import { store } from '../store';
import { Comments } from './comment-data';
import { Offer, Offers } from './offer';
import { UserData } from './user-data';


export type rootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | Record<string, never>;
}

export type DataProcess = {
  offerList: Offers;
  currentSortType: SortType;
  openedOfferCard: Offer | null;
  dataStatus: Status;
  submitReviewStatus: Status;
  offerReviews: Comments;
  offersNearby: Offers;
  favoritesOffers: Offers;
}

export type AppProcess = {
  currentCity: CitiesNames;
}

export type FavoritesProcess = {
  favoritesOffers: Offers;
}
