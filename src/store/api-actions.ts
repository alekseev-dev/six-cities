import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute } from '../const';
import { Offer, Offers } from '../types/offer';
import { AppDispatch } from '../types/state';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data';
import { dataProcessActions } from './data-process/data-process';
import { Comments } from '../types/comment-data';
import { appProcessActions } from './app-process/app-process';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const {data} = await api.get<Offers>(APIRoute.Hotels);
    return data;
  }
);

export const fetchOfferCardAction = createAsyncThunk<{offer: Offer; comments: Comments; offersNearby: Offers}, number, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'data/fetchOfferCard',
  async (id, {dispatch, extra: api }) => {
    const [{data: offer}, {data: comments}, {data: offersNearby}] = await Promise.all([
      api.get<Offer>(`${APIRoute.Hotels}/${id}`),
      api.get<Comments>(`${APIRoute.Comments}/${id}`),
      api.get<Offers>(`${APIRoute.Hotels}/${id}/nearby`),
    ]);
    dispatch(appProcessActions.activeOfferCard({location: offer.location, id: offer.id}));
    return {offer, comments, offersNearby};
  }
);

export const fetchFavoritesOffersAction = createAsyncThunk<Offers, undefined, {
  extra: AxiosInstance;
}>(
  'favorites/fetchFavoritesOffers',
  async (_arg, {extra: api }) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  }
);

export const changeOfferStatusAction = createAsyncThunk<Offer, {id: number; isFavorite: boolean}, {
  extra: AxiosInstance;
}>(
  'data/changeOfferStatus',
  async ({id, isFavorite}, { extra: api }) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${Number(!isFavorite)}`);
    return data;
  }
);

export const submitReviewAction = createAsyncThunk<Comments, {id: number; comment: string; rating: number}, {
  extra: AxiosInstance;
}>(
  'data/submitReview',
  async ({id, comment, rating}, { extra: api }) => {
    const {data} = await api.post<Comments>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  extra: AxiosInstance;
  fulfillWithValue: UserData;
  }>(
    'user/checkAuth',
    async (_arg, {extra: api}) => {
      const { data } = await api.get<UserData>(APIRoute.Login);
      return data;
    }
  );

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dispatch(dataProcessActions.setAllFavFlagsFalseAction());
    dropToken();
  }
);
