import { createSlice } from '@reduxjs/toolkit';
import { fetchStatus } from './fetchStatus';
import { dayInfo, eatenProduct, removeProduct } from './diary-operations';

const initialState = {
  status: '',
  timeDay: null,
  eatenProducts: [],
  daySummary: null,
  dayInform: null,
};

const products = createSlice({
  name: 'search',
  initialState,
  reducers: {
    timeSet(state, action) {
      state.timeDay = action.payload;
    },
  },
  extraReducers: {
    // [searcheProducts.pending](state) {
    //   state.status = fetchStatus.loading;
    // },
    // [searcheProducts.fulfilled](state, action) {
    //   // state.status = fetchStatus.loading;
    //   state.products = action.payload;
    // },
    // [searcheProducts.rejected](state) {
    //   state.status = fetchStatus.error;
    // },

    [eatenProduct.pending](state) {
      state.status = fetchStatus.loading;
    },
    [eatenProduct.fulfilled](state, action) {
      state.eatenProducts =
        action.payload.day?.eatenProducts ||
        action.payload.newDay?.eatenProducts;
      state.daySummary = action.payload.daySummary || action.payload.newSummary;
      state.products = null;
      state.dayInform = action.payload.newDay?.id || action.payload.day?.id;
    },
    [eatenProduct.rejected](state) {
      state.status = fetchStatus.error;
    },

    [dayInfo.pending](state) {
      state.status = fetchStatus.loading;
    },
    [dayInfo.fulfilled](state, action) {
      state.status = fetchStatus.success;
      state.dayInform = action.payload.id;
      state.daySummary = action.payload.daySummary || action.payload;
      state.eatenProducts = action.payload.eatenProducts;
    },

    [removeProduct.fulfilled](state, action) {
      state.eatenProducts = state.eatenProducts.filter(
        item => item.id !== action.meta.arg.eatenProductId
      );
      state.daySummary = action.payload.newDaySummary;
      console.log('newDaySummary', action.payload.newDaySummary);
    },
  },
});
export const { timeSet } = products.actions;
const productsReducer = products.reducer;
export default productsReducer;
