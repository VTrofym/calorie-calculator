import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const dailyRateState = {
  dailyRate: null,
  notAllowedProducts: [],
  error: null,
  isLoading: false,
};

axios.defaults.baseURL = 'https://slimmom-backend.goit.global';

export const dailyRateOperation = createAsyncThunk(
  'dailyRate/fetchDaily',
  async (credentials, thunkApi) => {
    try {
      const { data } = await axios.post('/daily-rate', credentials);
      return data;
    } catch (err) {}
  }
);
