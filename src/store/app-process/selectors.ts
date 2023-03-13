import { CitiesNames, NameSpace } from '../../const';
import { rootState } from '../../types/state';


export const getCurrentCity = (state: rootState): CitiesNames => state[NameSpace.App].currentCity;
