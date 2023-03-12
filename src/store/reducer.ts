import { AuthorizationStatus, CitiesNames } from '../const';
import { chooseCity, fetchOffers, requireAuthorization, setOffersDataLoadingStatus } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';

type InitialState = {
  currentCity: CitiesNames;
  offerList: Offers;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  currentCity: CitiesNames.Paris,
  offerList: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(chooseCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(fetchOffers, (state, action) => {
      state.offerList = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
