import { AuthorizationStatus, NameSpace } from '../../const';
import { rootState } from '../../types/state';


export const getAuthorizationStatus = (state: rootState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

