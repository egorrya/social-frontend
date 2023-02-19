import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layouts/PageLayout';
import Posts from '../../components/screens/Posts';
import PostForm from '../../components/ui/PostForm';
import { RootState } from '../../state/store';

const Profile: FC = () => {
	const { username } = useParams();

	const { user } = useSelector((state: RootState) => state.auth);

	return (
		<PageLayout>
			{user && user.username === username && <PostForm type='create' />}
			{username && <Posts filter='user_posts' username={username} />}
		</PageLayout>
	);
};

export default Profile;
