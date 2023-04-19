import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcessInitialState, userReducer } from './user-process';

const mockUserData = makeFakeUserData();

describe('Reducer: userProcess', () => {

  it('without additional parameters shoult return initial state', () => {
    expect(userReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(userProcessInitialState);
  });

  it('should return AuthorizationStatus "Auth" and userData if checkAuthAction fulfilled', () => {
    expect(userReducer(userProcessInitialState, {
      type: checkAuthAction.fulfilled.type,
      payload: mockUserData,
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
      });
  });

  it('should return AuthorizationStatus "NoAuth" if checkAuthAction rejected', () => {
    expect(userReducer(userProcessInitialState, {
      type: checkAuthAction.rejected.type,
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {},
      });
  });

  it('should return AuthorizationStatus "Auth" and userData if loginAction fulfilled', () => {
    expect(userReducer(userProcessInitialState, {
      type: loginAction.fulfilled.type,
      payload: mockUserData,
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
      });
  });

  it('should return AuthorizationStatus "NoAuth" and empty {} in userData if logoutAction fulfilled', () => {
    expect(userReducer(userProcessInitialState, {
      type: logoutAction.fulfilled.type,
    }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {},
      });
  });
});


