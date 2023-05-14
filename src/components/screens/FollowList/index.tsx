import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { RootState, useAppDispatch } from '../../../state/store';
import { getFollowUsers } from '../../../state/users/asyncActions';
import { clearUsers } from '../../../state/users/slice';
import { Status } from '../../../types/fetchStatus';
import FollowButton from '../../ui/Buttons/FollowButton';
import EmptyCard from '../../ui/EmptyCard';
import Loader from '../../ui/Loader';
import UserAvatar from '../../ui/UserAvatar';

import styles from './FollowList.module.scss';

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

	const { page, hasMore, setHasMore, setObserverTarget } = useInfiniteScroll(
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
	}, [dispatch, setHasMore]);

	return (
		<>
			{users.map((user) => (
				<div className={styles.FollowListItem} key={user._id}>
					<Link
						to={`/${user.username}`}
						className={styles.FollowListItem__userInfo}
					>
						<UserAvatar
							size='small'
							username={user.username}
							imageSrc={user.avatar}
						/>
						<p>
							<strong>{user.fullName && user.fullName}</strong> @{user.username}
						</p>
					</Link>

					{loggedIn && <FollowButton user={user} />}
				</div>
			))}

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget}></div>
			)}

			{users.length === 0 && status === Status.SUCCESS && (
				<EmptyCard emoji='🤷‍♂️' border={false} gradient={false}>
					No users found
				</EmptyCard>
			)}

			{status === Status.LOADING && <Loader />}

			{status === Status.ERROR && (
				<EmptyCard emoji='😢' border={false} gradient={false}>
					{error as string}
				</EmptyCard>
			)}
		</>
	);
};

export default FollowList;
