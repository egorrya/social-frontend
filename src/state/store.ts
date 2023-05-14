import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import auth from './auth/slice';
import comments from './comments/slice';
import filters from './filters/slice';
import modal from './modal/slice';
import notificationPopup from './notificationPopup/slice';
import postCreation from './posts/postCreationSlice';
import postEdit from './posts/postEditSlice';
import singlePost from './posts/singlePostSlice';
import posts from './posts/slice';
import singleUser from './users/singleUserSlice';
import users from './users/slice';

export const store = configureStore({
	reducer: {
		filters,
		modal,
		notificationPopup,
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
