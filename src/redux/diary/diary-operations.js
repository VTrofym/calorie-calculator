import axios from 'axios';
import { toast } from 'react-toastify';
import { token } from 'redux/auth/auth-operations';

const { createAsyncThunk } = require('@reduxjs/toolkit');

// export async function search(product) {
//   const { data } = await axios.get(
//     `https://slimmom-backend.goit.global/product?search=${product}`
//   );
//   return data;
// }

export async function postDay(body) {
  const { data } = await axios.post(
    `https://slimmom-backend.goit.global/day`,
    body
  );
  return data;
}

export async function postDayInfo(body) {
  const { data } = await axios.post(
    `https://slimmom-backend.goit.global/day/info`,
    body
  );
  return data;
}

async function remove(body) {
  const { data } = await axios.delete(
    'https://slimmom-backend.goit.global/day',
    { data: body }
  );
  return data;
}

// export const searcheProducts = createAsyncThunk(
//   'search/product',
//   async (data, thunkAPI) => {
//     try {
//       const response = await search(data);
//       return response;
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e.message);
//     }
//   }
// );

export const eatenProduct = createAsyncThunk(
  'search/day',
  async (data, thunkAPI) => {
    // const state = thunkAPI.getState();
    try {
      const response = await postDay(data);
      return response;
    } catch (e) {
      toast.error(e.response.data.message, {
        position: 'top-right',
      });
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const dayInfo = createAsyncThunk(
  'search/dayInfo',
  async (data, thunkAPI) => {
    // const state = thunkAPI.getState();
    const state = thunkAPI.getState();
    const persistToken = state.auth.token;
    token.set(persistToken);
    if (persistToken === null) {
      return thunkAPI.rejectWithValue();
    }
    try {
      const response = await postDayInfo(data);
      const result = { ...data, ...response };
      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const removeProduct = createAsyncThunk(
  'delete/removeProduct',
  async (data, thunkAPI) => {
    try {
      const response = await remove(data);
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
