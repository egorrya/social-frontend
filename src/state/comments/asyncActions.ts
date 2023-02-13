import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  CommentsApi,
  getCommentsOptions,
} from '../../services/api/CommentsApi';

export const getAllComments = createAsyncThunk(
  'comments',
  async (options: getCommentsOptions, { rejectWithValue }) => {
    try {
      const response = await CommentsApi.getAll(options);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
