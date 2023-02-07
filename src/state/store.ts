import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import auth from './auth/slice';
import modal from './modal/slice';
import postCreation from './postCreation/slice';
import posts from './posts/slice';

export const store = configureStore({
  reducer: { modal, auth, posts, postCreation },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
