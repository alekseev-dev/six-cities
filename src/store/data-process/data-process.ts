import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType, Status } from '../../const';
import { DataProcess } from '../../types/state';
import { checkForEmptyArray } from '../../utils/utils';
import { changeOfferStatusAction, fetchFavoritesOffersAction, fetchOfferCardAction, fetchOffersAction, submitReviewAction } from '../api-actions';


const initialState: DataProcess = {
  offerList: [],
  currentSortType: SortType.Popular,
  openedOfferCard: null,
  dataStatus: Status.Idle,
  submitReviewStatus: Status.Idle,
  offerReviews: [],
  offersNearby: [],
  favoritesOffers: [],
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setAllFavFlagsFalseAction: (state) => {
      state.offerList.forEach((offer) => {
        if (offer.isFavorite) {
          offer.isFavorite = false;
        }
        if (state.openedOfferCard) {
          state.openedOfferCard.isFavorite = false;
        }
      });
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.currentSortType = action.payload;
    },
    cleanUpOfferCardInStore: (state) => {
      state.openedOfferCard = null;
      state.offersNearby = [];
      state.offerReviews = [];
    },
    cleanUpfavoritesOffersInStore: (state) => {
      state.favoritesOffers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.dataStatus = Status.Loading;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offerList = action.payload;
        state.dataStatus = Status.Success;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.offerList = [];
        state.dataStatus = Status.Error;
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (state, action) => {
        state.favoritesOffers = action.payload;
      })
      .addCase(fetchOfferCardAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload.offersNearby;
        state.offerReviews = action.payload.comments;
        state.openedOfferCard = action.payload.offer;
      })
      .addCase(submitReviewAction.pending, (state) => {
        state.submitReviewStatus = Status.Loading;
      })
      .addCase(submitReviewAction.fulfilled, (state, action) => {
        state.offerReviews = action.payload;
        state.submitReviewStatus = Status.Success;
      })
      .addCase(submitReviewAction.rejected, (state) => {
        state.submitReviewStatus = Status.Error;
      })
      .addCase(changeOfferStatusAction.fulfilled, (state, action) => {
        const offerItem = state.offerList.find((item) => item.id === action.payload.id);
        if (typeof offerItem === 'undefined') {
          return;
        }
        offerItem.isFavorite = action.payload.isFavorite;

        if (checkForEmptyArray(state.favoritesOffers)) {
          state.favoritesOffers = state.favoritesOffers.filter((item) => item.id !== action.payload.id);
        }

        if (state.openedOfferCard) {
          state.openedOfferCard.isFavorite = action.payload.isFavorite;
        }

        if (checkForEmptyArray(state.offersNearby)) {
          const offerNearby = state.offersNearby.find((item) => item.id === action.payload.id);
          if (typeof offerNearby === 'undefined') {
            return;
          }
          offerNearby.isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const { reducer: dataProcessReducer, actions: dataProcessActions} = dataProcess;
export {initialState as dataProcessInitialState};
