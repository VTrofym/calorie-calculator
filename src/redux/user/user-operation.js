import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { token } from '../auth/auth-operations';

axios.defaults.baseURL = 'https://slimmom-backend.goit.global';
export const handlesetDataToApiWithId = createAsyncThunk(
  'user/daily-rate-id',
  async ({ body, userid }, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/daily-rate/' + userid, body);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export async function currentUser() {
  const { data } = await axios.get('https://slimmom-backend.goit.global/user');
  return data;
}
export const current = createAsyncThunk('current/user', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistToken = state.auth.token;
  if (persistToken === null) {
    return thunkAPI.rejectWithValue();
  }
  token.set(persistToken);
  try {
    const result = await currentUser();
    return result;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
