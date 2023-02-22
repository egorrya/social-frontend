import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layouts/PageLayout';
import Posts from '../../components/screens/Posts';
import PostForm from '../../components/ui/PostForm';
import ProfileInfo from '../../components/ui/ProfileInfo';
import { RootState, useAppDispatch } from '../../state/store';
import { getUser } from '../../state/users/asyncActions';
import { initializeUser } from '../../state/users/singleUserSlice';
import { Status } from '../../types/fetchStatus';

const Profile: FC = () => {
	const dispatch = useAppDispatch();

	const { username } = useParams();

	const { user: authUser } = useSelector((state: RootState) => state.auth);
	const { user, status } = useSelector((state: RootState) => state.singleUser);

	useEffect(() => {
		if (username && authUser && authUser.username === username)
			dispatch(initializeUser(authUser));

		if (username && (!authUser || authUser.username !== username))
			dispatch(getUser(username));

		return () => {
			dispatch(initializeUser(null));
		};
	}, [username, authUser, dispatch]);

	return (
		<PageLayout>
			{user && username && (
				<>
					<ProfileInfo />
					{authUser && authUser.username === username && (
						<PostForm type='create' />
					)}
					<Posts filter='user_posts' username={username} />
				</>
			)}

			{status === Status.ERROR && <h1>Failed to load user</h1>}

			{status === Status.LOADING && <h1>Loading...</h1>}
		</PageLayout>
	);
};

export default Profile;
