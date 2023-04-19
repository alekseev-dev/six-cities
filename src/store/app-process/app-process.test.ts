import { CitiesNames } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { appProcessActions, appProcessInitialState, appReducer } from './app-process';


describe('appReducer: appProcess', () => {

  it('without additional parameters shoult return initial state', () => {
    expect(appReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(appProcessInitialState);
  });

  it('should set value "currentCity" to a given value', () => {
    expect(appReducer(appProcessInitialState, appProcessActions.chooseCity(CitiesNames.Brussels)))
      .toEqual({
        currentCity: CitiesNames.Brussels,
        activeOfferCard: null,
      });
  });

  it('should set value "activeOfferCard" to a given value', () => {
    const mockOffer = makeFakeOffer();

    expect(appReducer(appProcessInitialState, appProcessActions.activeOfferCard({
      location: mockOffer.location,
      id: mockOffer.id,
    })))
      .toEqual({
        currentCity: CitiesNames.Paris,
        activeOfferCard: {
          location: mockOffer.location,
          id: mockOffer.id,
        },
      });
  });
});
