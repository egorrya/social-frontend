import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostsApi } from '../../services/api/PostsApi';

export const createPost = createAsyncThunk(
  'postCreation',
  async (text: string, { rejectWithValue }) => {
    try {
      const { data } = await PostsApi.createPost(text);

      return data;
    } catch (error: any) {
      const message = error.response.data.message ?? error.response.data[0].msg;

      return rejectWithValue(message);
    }
  }
);
