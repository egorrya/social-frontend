import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPostsOptions, PostsApi } from '../../services/api/PostsApi';

export const getAllPosts = createAsyncThunk(
  'posts',
  async (options: getPostsOptions, { rejectWithValue }) => {
    try {
      const response = await PostsApi.getAll(options);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
