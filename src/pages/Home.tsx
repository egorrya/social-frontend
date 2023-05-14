import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import PageLayout from '../components/layouts/PageLayout';
import PostForm from '../components/screens/Forms/PostForm';
import Posts from '../components/screens/Posts';
import PostsFilter from '../components/screens/PostsFilter';

const Home: FC = () => {
	const { loggedIn } = useSelector((state: RootState) => state.auth);
	const { activeHomeFilter } = useSelector((state: RootState) => state.filters);

	return (
		<PageLayout>
			{loggedIn && <PostForm type='create' />}
			<PostsFilter />
			<Posts filter={activeHomeFilter} />
		</PageLayout>
	);
};

export default Home;
