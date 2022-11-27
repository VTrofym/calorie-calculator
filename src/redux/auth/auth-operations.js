import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { omit } from 'lodash';
import { toast } from 'react-toastify';
import { handlesetDataToApiWithId } from '../user/user-operation';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export async function registerNewUser(user) {
  const { data } = await axios.post(
    'https://slimmom-backend.goit.global/auth/register',
    user
  );
  return data;
}
export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      const response = await registerNewUser(data);
      return response;
    } catch (e) {
      toast.error(e.response.data.message, {
        position: 'top-right',
      });
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export async function loginUser(user) {
  const { data } = await axios.post(
    'https://slimmom-backend.goit.global/auth/login',
    user
  );
  return data;
}
export const login = createAsyncThunk(
  'auth/login',
  async (data, { getState, dispatch, rejectWithValue }) => {
    const userData = getState().user.userData;
    try {
      const response = await loginUser(data);
      token.set(response.accessToken);
      const isUserDataFilled =
        userData.weight &&
        userData.height &&
        userData.age &&
        userData.bloodType;

      if (!response.dailyRate && isUserDataFilled) {
        dispatch(
          handlesetDataToApiWithId({
            body: omit(userData, 'notAllowedProducts', 'dailyRate'),
            userid: response.user.id,
          })
        );
      }
      // if (response.status === 409) {
      //   toast.error('You are already registered', {
      //     position: 'top-right',
      //   });
      // }
      return response;
    } catch (e) {
      toast.error('Something wrong!', {
        position: 'top-right',
      });

      return rejectWithValue(e.message);
    }
  }
);

export async function logoutUser() {
  const { data } = await axios.post(
    'https://slimmom-backend.goit.global/auth/logout'
  );
  return data;
}
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await logoutUser();
    token.unset(response.accessToken);
    return response;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
