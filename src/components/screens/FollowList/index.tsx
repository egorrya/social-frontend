import { FC, LegacyRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { RootState, useAppDispatch } from '../../../state/store';
import { getFollowUsers } from '../../../state/users/asyncActions';
import { clearUsers } from '../../../state/users/slice';
import { Status } from '../../../types/fetchStatus';
import FollowButton from '../../ui/FollowButton';

interface FollowListProps {
	type: 'followers' | 'following';
	username: string;
}

const FollowList: FC<FollowListProps> = ({ type, username }) => {
	const dispatch = useAppDispatch();

	const { users, lastPage, currentPage, status, error } = useSelector(
		(state: RootState) => state.users
	);

	const { loggedIn } = useSelector((state: RootState) => state.auth);

	const { page, hasMore, setObserverTarget } = useInfiniteScroll(
		currentPage,
		lastPage,
		100
	);

	useEffect(() => {
		if (hasMore) dispatch(getFollowUsers({ type, username, page }));
	}, [dispatch, page, hasMore, username, type]);

	useEffect(() => {
		return () => {
			dispatch(clearUsers());
		};
	}, [dispatch]);

	return (
		<>
			{users.map((user) => (
				<>
					<div>{user.username}</div>

					{loggedIn && <FollowButton user={user} />}
				</>
			))}

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget as LegacyRef<HTMLDivElement>}></div>
			)}

			{status === Status.SUCCESS && !hasMore && (
				<div>No {users.length > 0 && 'more'} users</div>
			)}

			{status === Status.LOADING && <div>Loading...</div>}

			{status === Status.ERROR && <div>{error as string}</div>}
		</>
	);
};

export default FollowList;
