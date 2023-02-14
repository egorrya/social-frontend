import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import PageLayout from '../components/layouts/PageLayout';
import Posts from '../components/screens/Posts';
import PostForm from '../components/ui/PostForm';

const Home: FC = () => {
	const { loggedIn } = useSelector((state: RootState) => state.auth);

	return (
		<PageLayout>
			{loggedIn && <PostForm type='create' />}
			<Posts filter='all' />
		</PageLayout>
	);
};

export default Home;
