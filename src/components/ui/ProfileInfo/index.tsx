import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
import FollowButton from '../FollowButton';

const ProfileInfo: FC = () => {
	const { user: authUser } = useSelector((state: RootState) => state.auth);
	const { user, status } = useSelector((state: RootState) => state.singleUser);

	return (
		<div>
			{status === Status.SUCCESS && user && (
				<div>
					<h1>{user.username}</h1>
					<Link to={`/${user.username}/followers`}>
						{user.followers.length} Followers
					</Link>
					<Link to={`/${user.username}/following`}>
						{user.following.length} Following
					</Link>

					{authUser && authUser.username !== user.username && (
						<FollowButton user={user} />
					)}
				</div>
			)}

			{status === 'error' && (
				<div>
					<h1>Failed to load user</h1>
				</div>
			)}

			{status === 'loading' && (
				<div>
					<h1>Loading...</h1>
				</div>
			)}
		</div>
	);
};

export default ProfileInfo;
