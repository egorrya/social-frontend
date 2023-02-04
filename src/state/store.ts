import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import login from './login/slice';
import modal from './modal/slice';
import posts from './posts/slice';

export const store = configureStore({
  reducer: { modal, login, posts },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
