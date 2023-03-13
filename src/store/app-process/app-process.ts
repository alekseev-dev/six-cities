import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CitiesNames, NameSpace } from '../../const';
import { AppProcess } from '../../types/state';


const initialState: AppProcess = {
  currentCity: CitiesNames.Paris,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    chooseCity: (state, action: PayloadAction<CitiesNames>) => {
      state.currentCity = action.payload;
    }
  }
});

export const {chooseCity} = appProcess.actions;
