import { NameSpace, SortType, Status } from '../../const';
import { Offer, Offers } from '../../types/offer';
import { rootState } from '../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { getCurrentCity } from '../app-process/selectors';
import { Comments } from '../../types/comment-data';

export const getOfferList = (state: rootState): Offers => state[NameSpace.Data].offerList;
export const getCurrentSortType = (state: rootState): SortType => state[NameSpace.Data].currentSortType;
export const getDataStatus = (state: rootState): Status => state[NameSpace.Data].dataStatus;
export const getSubmitReviewStatus = (state: rootState): Status => state[NameSpace.Data].submitReviewStatus;
export const getFavoritesOffers = (state: rootState): Offers => state[NameSpace.Data].favoritesOffers;
export const getOfferCard = (state: rootState): Offer | null => state[NameSpace.Data].openedOfferCard;
export const getOfferCardReviews = (state: rootState): Comments => state[NameSpace.Data].offerReviews;
export const getOffersNearby = (state: rootState): Offers => state[NameSpace.Data].offersNearby;

export const selectOffersByCity = createSelector(
  [getOfferList, getCurrentCity],
  (offerList, currentCity) => offerList.filter((item) => item.city.name === currentCity)
);

export const selectOffersByFilter = createSelector(
  [selectOffersByCity, getCurrentSortType],
  (OfferList, currentSortType) => {
    if (currentSortType === SortType.Popular) {
      return [...OfferList];
    }
    if (currentSortType === SortType.PriceHighToLow) {
      return [...OfferList].sort((a, b) => b.price - a.price);
    }
    if (currentSortType === SortType.PriceLowToHigh) {
      return [...OfferList].sort((a, b) => a.price - b.price);
    }
    if (currentSortType === SortType.TopRated) {
      return [...OfferList].sort((a, b) => a.rating - b.rating);
    }
  }
);

