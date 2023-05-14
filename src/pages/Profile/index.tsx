import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layouts/PageLayout';
import PostForm from '../../components/screens/Forms/PostForm';
import Posts from '../../components/screens/Posts';
import EmptyCard from '../../components/ui/EmptyCard';
import Loader from '../../components/ui/Loader';
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
		if (username && authUser?.username === username)
			dispatch(initializeUser(authUser));
	}, [username, authUser, dispatch]);

	useEffect(() => {
		if (username && !user) dispatch(getUser(username));
	}, [username, user, dispatch]);

	useEffect(() => {
		return () => {
			dispatch(initializeUser(null));
		};
	}, [dispatch]);

	if (status === Status.LOADING)
		return (
			<PageLayout>
				<Loader />
			</PageLayout>
		);

	if (status === Status.ERROR)
		return (
			<PageLayout>
				<EmptyCard emoji='😢' border={false} gradient={false}>
					404 - Page not found
				</EmptyCard>
			</PageLayout>
		);

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
		</PageLayout>
	);
};

export default Profile;
