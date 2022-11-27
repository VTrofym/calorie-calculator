import { createSlice } from '@reduxjs/toolkit';
import { fetchStatus } from './fetchStatus';
import { login, logout, register } from './auth-operations';

const initialState = {
  token: null,
  status: fetchStatus.init,
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.pending](state) {
      state.status = fetchStatus.loading;
    },
    [register.fulfilled](state, action) {
      state.status = fetchStatus.success;
      state.token = action.payload.accessToken;
    },
    [register.rejected](state) {
      state.status = fetchStatus.error;
      state.token = null;
    },

    [login.pending](state) {
      state.status = fetchStatus.loading;
    },
    [login.fulfilled](state, action) {
      state.status = fetchStatus.success;
      state.token = action.payload?.accessToken;
      state.refreshToken = action.payload?.refreshToken;
    },
    [login.rejected](state) {
      state.status = fetchStatus.error;
      state.token = null;
      state.refreshToken = '';
    },

    [logout.pending](state) {
      state.status = fetchStatus.loading;
    },
    [logout.fulfilled](state) {
      state.status = fetchStatus.success;
      state.token = null;
    },
    [logout.rejected](state) {
      state.status = fetchStatus.error;
      state.token = null;
    },
  },
});
const authReducer = authSlice.reducer;

export default authReducer;
