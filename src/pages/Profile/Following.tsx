import { FC } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../../components/layouts/PageLayout';
import FollowList from '../../components/screens/FollowList';

const Following: FC = () => {
	const { username } = useParams();

	return (
		<PageLayout>
			{username && <FollowList type='following' username={username} />}
		</PageLayout>
	);
};

export default Following;
