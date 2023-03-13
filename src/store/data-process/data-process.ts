import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';


const initialState: DataProcess = {
  offerList: [],
  isOffersDataLoading: false,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offerList = action.payload;
        state.isOffersDataLoading = false;
      });
  }
});
