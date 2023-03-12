import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../const';
import { Offers } from '../types/offer';


export const chooseCity = createAction('city/chooseCity', (pickedCity) => ({
  payload: pickedCity,
}));

export const fetchOffers = createAction<Offers>('data/fetchOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('city/redirectToRoute');
