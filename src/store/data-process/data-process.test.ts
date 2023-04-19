import { SortType, Status } from '../../const';
import { makeFakeComments, makeFakeOffers, makeFakeComment, makeFakeOffer } from '../../utils/mocks';
import { changeOfferStatusAction, fetchFavoritesOffersAction, fetchOfferCardAction, fetchOffersAction, submitReviewAction } from '../api-actions';
import { dataProcessActions, dataProcessInitialState, dataProcessReducer } from './data-process';

const mockOffers = makeFakeOffers();
const mockComment = makeFakeComment();
const mockComments = makeFakeComments();

describe('Reducer: dataProcess', () => {

  it('without additional parametrs should return initial state', () => {
    expect(dataProcessReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(dataProcessInitialState);
  });

  it('should turn all flags to "false" in "offerList"', () => {
    const state = {
      ...dataProcessInitialState,
      offerList: [
        {...mockOffers[0], isFavorite: true},
        {...mockOffers[1], isFavorite: true},
      ],
    };
    expect(dataProcessReducer(state, dataProcessActions.setAllFavFlagsFalseAction()))
      .toEqual({
        ...dataProcessInitialState,
        offerList: [
          {...mockOffers[0], isFavorite: false},
          {...mockOffers[1], isFavorite: false},
        ],
      });
  });

  it('should change "currentSortType"to a given value', () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, dataProcessActions.setSortType(SortType.TopRated)))
      .toEqual({
        ...dataProcessInitialState,
        currentSortType: SortType.TopRated
      });
  });

  it('should cleaup "openedOfferCard", "offersNearby", "offerReviews"', () => {
    const state = {
      ...dataProcessInitialState,
      openedOfferCard: mockOffers[0],
      offersNearby: mockOffers,
      offerReviews: mockComments,
    };
    expect(dataProcessReducer(state, dataProcessActions.cleanUpOfferCardInStore()))
      .toEqual(dataProcessInitialState);
  });

  it('should cleaup "favoritesOffers"', () => {
    const state = {
      ...dataProcessInitialState,
      favoritesOffers: mockOffers,
    };
    expect(dataProcessReducer(state, dataProcessActions.cleanUpfavoritesOffersInStore()))
      .toEqual(dataProcessInitialState);
  });

  it('should set up value of "dataStatus" to "Loading', () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: fetchOffersAction.pending.type}))
      .toEqual({
        ...dataProcessInitialState,
        dataStatus: Status.Loading,
      });
  });

  it('should set up value of "dataStatus" to "Success" and load offers' , () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: fetchOffersAction.fulfilled.type, payload: mockOffers}))
      .toEqual({
        ...dataProcessInitialState,
        dataStatus: Status.Success,
        offerList: mockOffers,
      });
  });

  it('should set up value of "dataStatus" to "Error"' , () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: fetchOffersAction.rejected.type}))
      .toEqual({
        ...dataProcessInitialState,
        dataStatus: Status.Error,
        offerList: [],
      });
  });

  it('should load "favoritesOffers"' , () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: fetchFavoritesOffersAction.fulfilled.type, payload: mockOffers}))
      .toEqual({
        ...dataProcessInitialState,
        favoritesOffers: mockOffers,
      });
  });

  it('should load "offersNearby", "offerReviews", "openedOfferCard"' , () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: fetchOfferCardAction.fulfilled.type, payload: {
      offersNearby: mockOffers,
      comments: mockComments,
      offer: mockOffers[0],
    }}))
      .toEqual({
        ...dataProcessInitialState,
        offersNearby: mockOffers,
        offerReviews: mockComments,
        openedOfferCard: mockOffers[0],
      });
  });

  it('should set up value of "submitReviewStatus" to "Loading"' , () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: submitReviewAction.pending.type}))
      .toEqual({
        ...dataProcessInitialState,
        submitReviewStatus: Status.Loading,
      });
  });

  it('should set up value of "dataStatus" to "Success" and update "offerReviews"' , () => {
    const state = {
      ...dataProcessInitialState,
      offerReviews: mockComments,
    };
    expect(dataProcessReducer(state, {type: submitReviewAction.fulfilled.type, payload: [...mockComments, mockComment]}))
      .toEqual({
        ...dataProcessInitialState,
        submitReviewStatus: Status.Success,
        offerReviews: [...mockComments, mockComment]
      });
  });

  it('should set up value of "submitReviewStatus" to "Error"' , () => {
    const state = {
      ...dataProcessInitialState,
    };
    expect(dataProcessReducer(state, {type: submitReviewAction.rejected.type}))
      .toEqual({
        ...dataProcessInitialState,
        submitReviewStatus: Status.Error,
      });
  });

  it('should find offer with id = 1 in mockOffers and change isFavorite to true (changeOfferStatusAction)' , () => {
    const mockOfferItem = makeFakeOffer({isFavorite: false, id: 1});

    const payloadOfferItem = {
      ...mockOfferItem,
      isFavorite: true,
    };

    const state = {
      ...dataProcessInitialState,
      offerList: [...mockOffers, mockOfferItem],
    };

    expect(dataProcessReducer(state, {type: changeOfferStatusAction.fulfilled.type, payload: payloadOfferItem}))
      .toEqual({
        ...dataProcessInitialState,
        offerList: [
          ...mockOffers,
          {...mockOfferItem,
            isFavorite: payloadOfferItem.isFavorite
          }
        ]
      });
  });
});
