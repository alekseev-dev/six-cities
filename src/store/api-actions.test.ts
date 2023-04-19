import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { rootState } from '../types/state';
import { Action } from 'redux';
import { APIRoute } from '../const';
import { changeOfferStatusAction, checkAuthAction, fetchFavoritesOffersAction, fetchOffersAction, loginAction, logoutAction, submitReviewAction } from './api-actions';
import { makeFakeOffers } from '../utils/mocks';
import { datatype, lorem } from 'faker';
import { redirectToRoute } from './action';
import { dataProcessActions } from './data-process/data-process';


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    rootState,
    Action<string>,
    ThunkDispatch<rootState, typeof api, Action>
  >(middleware);

  const mockOffers = makeFakeOffers();
  it('should dispatch "fetchOffersAction" when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mockOffers);


    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOffersAction" and go into reject when server return anything but 200-299', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(404);


    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.rejected.type,
    ]);
  });

  it('should dispatch "fetchFavoritesOffersAction" when server return 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    await store.dispatch(fetchFavoritesOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesOffersAction.pending.type,
      fetchFavoritesOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch "changeOfferStatusAction" when server return 200', async () => {
    const store = mockStore();

    const id = 1;
    const isFavorite = false;

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${Number(!isFavorite)}`)
      .reply(200, []);

    await store.dispatch(changeOfferStatusAction({id, isFavorite}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeOfferStatusAction.pending.type,
      changeOfferStatusAction.fulfilled.type,
    ]);
  });

  it('should dispatch "submitReviewAction" when server return 200', async () => {
    const store = mockStore();

    const id = 1;
    const comment = lorem.lines(3);
    const rating = datatype.number({min: 1, max: 5});

    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`, {comment, rating})
      .reply(200, []);

    await store.dispatch(submitReviewAction({id, comment, rating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      submitReviewAction.pending.type,
      submitReviewAction.fulfilled.type,
    ]);
  });

  it('should dispatch "submitReviewAction" and go to reject when server return anything but 200-299', async () => {
    const store = mockStore();

    const id = 1;
    const comment = lorem.lines(3);
    const rating = datatype.number({min: 1, max: 5});

    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`, {comment, rating})
      .reply(404, []);

    await store.dispatch(submitReviewAction({id, comment, rating}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      submitReviewAction.pending.type,
      submitReviewAction.rejected.type,
    ]);
  });

  it('should turn authorization status to "Auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch "loginAction" and redirectToRoute when POST /login', async () => {
    const store = mockStore();

    const email = '123qwerty@gmail.com';
    const password = '11rty';

    mockAPI
      .onPost(APIRoute.Login, {email, password})
      .reply(200, {token: 'secretToken'});

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction({email, password}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-secret-token', 'secretToken');
  });

  it('should dispatch "logoutAction" when Delete /logout', async () => {
    const store = mockStore();

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());
    store.dispatch(dataProcessActions.setAllFavFlagsFalseAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      dataProcessActions.setAllFavFlagsFalseAction.type,
      logoutAction.fulfilled.type,
      dataProcessActions.setAllFavFlagsFalseAction.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-secret-token');
  });
});
