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

export const getPost = createAsyncThunk(
  'singlePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      const { data } = await PostsApi.getPost(postId);

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

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

export const editPost = createAsyncThunk(
  'postEdit',
  async (
    { text, postId }: { text: string; postId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await PostsApi.editPost(text, postId);

      return data;
    } catch (error: any) {
      const message = error.response.data.message ?? error.response.data[0].msg;

      return rejectWithValue(message);
    }
  }
);
