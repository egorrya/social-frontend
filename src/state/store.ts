import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import auth from './auth/slice';
import modal from './modal/slice';

import postCreation from './posts/postCreationSlice';
import postEdit from './posts/postEditSlice';
import singlePost from './posts/singlePostSlice';
import posts from './posts/slice';

import comments from './comments/slice';

import singleUser from './users/singleUserSlice';
import users from './users/slice';

export const store = configureStore({
	reducer: {
		modal,
		auth,

		posts,
		postCreation,
		postEdit,
		singlePost,

		comments,

		users,
		singleUser,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
