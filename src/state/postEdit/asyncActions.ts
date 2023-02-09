import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostsApi } from '../../services/api/PostsApi';

interface EditPostPayload {
  text: string;
  postId: string;
}

export const editPost = createAsyncThunk(
  'postEdit',
  async ({ text, postId }: EditPostPayload, { rejectWithValue }) => {
    try {
      const { data } = await PostsApi.editPost(text, postId);

      return data;
    } catch (error: any) {
      const message = error.response.data.message ?? error.response.data[0].msg;

      return rejectWithValue(message);
    }
  }
);
