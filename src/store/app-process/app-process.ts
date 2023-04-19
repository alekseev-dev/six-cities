import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesNames, NameSpace } from '../../const';
import { ActiveOffer } from '../../types/offer';
import { AppProcess } from '../../types/state';


const initialState: AppProcess = {
  currentCity: CitiesNames.Paris,
  activeOfferCard: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    chooseCity: (state, action: PayloadAction<CitiesNames>) => {
      state.currentCity = action.payload;
    },
    activeOfferCard: (state, action: PayloadAction<ActiveOffer | null>) => {
      state.activeOfferCard = action.payload;
    }
  }
});

export const {reducer: appReducer, actions: appProcessActions} = appProcess;
export {initialState as appProcessInitialState};
