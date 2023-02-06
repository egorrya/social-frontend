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

export interface authSliceState {
  user: User | null;
  status: Status;
  error: unknown;
  loggedIn: boolean;
  loggedInWithSubmit: boolean;
}

const initialState: authSliceState = {
  user: null,
  status: Status.NEVER,
  error: null,
  loggedIn: localStorage.getItem('token') ? true : false,
  loggedInWithSubmit: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.status = Status.NEVER;
      state.error = null;
      state.loggedIn = false;
      state.loggedInWithSubmit = false;
    },
    setStatusSuccess: (state) => {
      state.status = Status.SUCCESS;
    },
  },
  extraReducers: (builder) => {
    // todo: refactor this
    builder
      .addCase(login.pending, (state) => {
        state.user = null;
        state.status = Status.LOADING;
        state.error = null;
        state.loggedIn = false;
        state.loggedInWithSubmit = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = Status.SUCCESS;
        state.error = null;
        state.loggedIn = true;
        state.loggedInWithSubmit = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.status = Status.ERROR;
        state.error = action.payload;
        state.loggedInWithSubmit = false;
      });

    builder
      .addCase(getMe.pending, (state) => {
        state.user = null;
        state.status = Status.LOADING;
        state.error = null;
        state.loggedIn = false;
        state.loggedInWithSubmit = false;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = Status.SUCCESS;
        state.error = null;
        state.loggedIn = true;
        state.loggedInWithSubmit = false;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.user = null;
        state.status = Status.ERROR;
        state.error = action.payload;
        state.loggedIn = false;
        state.loggedInWithSubmit = false;
      });
  },
});

export const { logOut, setStatusSuccess } = authSlice.actions;
export default authSlice.reducer;
