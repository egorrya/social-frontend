import { FC } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layouts/PageLayout';
import FollowList from '../../components/screens/FollowList';

const Followers: FC = () => {
	const { username } = useParams();

	return (
		<PageLayout>
			{username && <FollowList type='followers' username={username} />}
		</PageLayout>
	);
};

export default Followers;
