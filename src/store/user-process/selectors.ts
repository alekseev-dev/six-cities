import { AuthorizationStatus, NameSpace } from '../../const';
import { rootState } from '../../types/state';
import { UserData } from '../../types/user-data';


export const getAuthorizationStatus = (state: rootState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: rootState): UserData | Record<string, never> => state[NameSpace.User].userData;

