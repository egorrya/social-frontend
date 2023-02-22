import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FollowApi } from '../../../services/api/FollowApi';
import { RootState } from '../../../state/store';
import { User } from '../../../types';

interface FollowButtonProps {
	user: User;
}

const FollowButton: FC<FollowButtonProps> = ({ user }) => {
	const [isFollowed, setIsFollowed] = useState<boolean>(false);

	const { user: authUser } = useSelector((state: RootState) => state.auth);

	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (authUser) {
			setIsFollowed(authUser.following.includes(user._id));
		}
	}, [authUser, user._id]);

	const onFollowSubmit = (userId: string) => {
		setLoading(true);

		FollowApi.toggleFollow(userId)
			.then(() => setIsFollowed(!isFollowed))
			.finally(() => setLoading(false));
	};

	if (!authUser || authUser.username === user.username) return null;

	if (loading) return <div>Loading...</div>;

	return (
		<button onClick={() => onFollowSubmit(user._id)}>
			{isFollowed ? 'Unfollow' : 'Follow'}
		</button>
	);
};

export default FollowButton;
