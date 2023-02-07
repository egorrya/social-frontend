import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthApi, AuthFormProps } from '../../services/api/AuthApi';

export const auth = createAsyncThunk(
  'auth',
  async ({ type, credentials }: AuthFormProps, { rejectWithValue }) => {
    try {
      const { data } = await AuthApi.auth({ type, credentials });

      localStorage.setItem('token', data.token);

      return { ...data, type };
    } catch (error: any) {
      const message = error.response.data.message ?? error.response.data[0].msg;

      return rejectWithValue(message);
    }
  }
);

export const getMe = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthApi.getMe();

      return data;
    } catch (error: any) {
      localStorage.removeItem('token');

      return rejectWithValue(error.response.data.message);
    }
  }
);
