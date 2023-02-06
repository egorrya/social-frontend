import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/fetchStatus';

import { getAllPosts } from './asyncActions';
import { PostsState } from './types';

const initialState: PostsState = {
  posts: [],
  error: null,
  lastPage: null,
  status: Status.LOADING,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
      state.lastPage = null;
      state.status = Status.NEVER;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.posts = [...state.posts, ...action.payload.data];
        state.status = Status.SUCCESS;
        state.error = null;
        state.lastPage = action.payload.last_page;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as string;
      });
  },
});

export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
