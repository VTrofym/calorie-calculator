import { fetchStatus } from 'redux/diary/fetchStatus';
import { initialState } from './initial-state';
import { current, handlesetDataToApiWithId } from './user-operation';
import { createSlice } from '@reduxjs/toolkit';
import { logout } from 'redux/auth/auth-operations';
import { dailyRateOperation } from 'redux/dailyRate/dailyRate-operations';

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    // [handlesetDataToApiWithId.pending]: state => {
    //   state.status = fetchStatus.loading;
    // },
    // [handlesetDataToApiWithId.fulfilled]: state => {
    //   state.status = fetchStatus.success;
    //   state.userData = state.payload.DailyRate;
    // },
    // [handlesetDataToApiWithId.rejected]: (state, action) => {
    //   state.status = fetchStatus.error;
    //   state.error = action.payload;
    // },

    [handlesetDataToApiWithId.pending]: (state, { meta }) => {
      state.status = fetchStatus.loading;
      state.userData = meta.arg;
    },
    [handlesetDataToApiWithId.fulfilled]: (state, { payload }) => {
      state.status = fetchStatus.success;

      state.userData.dailyRate = payload.dailyRate;
      state.userData.notAllowedProducts = payload.notAllowedProducts;
    },
    [handlesetDataToApiWithId.rejected]: (state, action) => {
      state.status = fetchStatus.error;
      state.error = action.payload;
    },

    [current.pending](state) {
      state.status = fetchStatus.loading;
    },
    [current.fulfilled](state, action) {
      state.status = fetchStatus.success;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.userData = action.payload.userData;
    },
    [current.rejected](state) {
      state.status = fetchStatus.error;
    },
    [logout.pending](state) {
      state.status = fetchStatus.loading;
    },
    [logout.fulfilled](state) {
      return initialState;
    },
    [logout.rejected](state) {
      return initialState;
    },

    [dailyRateOperation.fulfilled]: (state, { meta }) => {
      state.userData = meta.arg;
    },
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
