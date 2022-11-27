import { createSlice } from '@reduxjs/toolkit';
import { dailyRateOperation, dailyRateState } from './dailyRate-operations';

const dailyRateSlice = createSlice({
  name: 'dailyRate',
  initialState: dailyRateState,
  extraReducers: {
    [dailyRateOperation.pending](state) {},
    [dailyRateOperation.fulfilled](state, action) {
      state.dailyRate = action.payload.dailyRate;
      state.notAllowedProducts = action.payload.notAllowedProducts;
    },
    [dailyRateOperation.rejected](state) {},
  },
});

export const dailyRateReducer = dailyRateSlice.reducer;
