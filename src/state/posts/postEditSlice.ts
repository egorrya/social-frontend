import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../components/ui/PostCard/types';
import { Status } from '../../types/fetchStatus';
import { editPost } from './asyncActions';

interface PostEditState {
  postData: Post | null;
  error: unknown;
  status: Status;
  editableId: string | null;
}

const initialState: PostEditState = {
  postData: null,
  error: null,
  status: Status.NEVER,
  editableId: null,
};

const postEditSlice = createSlice({
  name: 'postEdit',
  initialState,
  reducers: {
    changeEditableId: (state, action) => {
      state.editableId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editPost.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.postData = { ...action.payload, isOwnPost: true };
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(editPost.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload;
      });
  },
});

export const { changeEditableId } = postEditSlice.actions;
export default postEditSlice.reducer;
