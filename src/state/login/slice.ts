import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../../types/fetchStatus';
import { getMe, login } from './asyncActions';

interface User {
  _id: string;
  fullName?: string;
  username: string;
  email: string;
  following?: string[] | null;
  followers?: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface loginSliceState {
  user: User | null;
  status: Status;
  error: unknown;
}

const initialState: loginSliceState = {
  user: null,
  status: Status.NEVER,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = Status.NEVER;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.status = Status.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.status = Status.ERROR;
        state.error = action.payload;
      });

    builder
      .addCase(getMe.pending, (state) => {
        state.user = null;
        state.status = Status.LOADING;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = Status.SUCCESS;
        state.error = null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.user = null;
        state.status = Status.ERROR;
        state.error = action.payload;
      });
  },
});

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
