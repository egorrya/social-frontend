import { createAsyncThunk } from '@reduxjs/toolkit';
import { LogInFormProps } from '../../components/screens/LogInModal/types';
import { AuthApi } from '../../services/api/AuthApi';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LogInFormProps, { rejectWithValue }) => {
    try {
      const { data } = await AuthApi.logIn(credentials);

      localStorage.setItem('token', data.token);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
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
      localStorage.setItem('token', '');

      return rejectWithValue(error.response.data.message);
    }
  }
);
