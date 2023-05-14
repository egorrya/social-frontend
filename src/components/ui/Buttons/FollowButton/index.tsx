import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FollowApi } from '../../../../services/api/FollowApi';
import { toggleFollow } from '../../../../state/auth/slice';
import { RootState, useAppDispatch } from '../../../../state/store';
import { toggleFollowForSingleUser } from '../../../../state/users/singleUserSlice';
import { User } from '../../../../types';
import Button from '../Button';

interface FollowButtonProps {
	user: User;
}

const FollowButton: FC<FollowButtonProps> = ({ user }) => {
	const dispatch = useAppDispatch();
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
			.then(() => {
				setIsFollowed(!isFollowed);
				dispatch(toggleFollow(userId));
				dispatch(toggleFollowForSingleUser(authUser?._id));
			})
			.finally(() => setLoading(false));
	};

	if (!authUser || authUser.username === user.username) return null;

	if (loading) return <Button disabled>Loading...</Button>;

	return (
		<Button onClick={() => onFollowSubmit(user._id)}>
			{isFollowed ? 'Unfollow' : 'Follow'}
		</Button>
	);
};

export default FollowButton;
