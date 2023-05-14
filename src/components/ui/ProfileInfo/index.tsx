import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
import FollowButton from '../Buttons/FollowButton';
import EmptyCard from '../EmptyCard';
import UserAvatar from '../UserAvatar';

import styles from './ProfileInfo.module.scss';

const ProfileInfo: FC = () => {
	const { user: authUser } = useSelector((state: RootState) => state.auth);
	const { user, status } = useSelector((state: RootState) => state.singleUser);

	return (
		<div>
			{status === Status.SUCCESS && user && (
				<div className={styles.profileInfo}>
					<UserAvatar
						size='medium'
						username={user.username}
						imageSrc={user.avatar}
					/>

					<div className={styles.profileInfo__username}>
						{user.fullName && <span>{user.fullName}</span>}
						<span
							className={
								user.fullName && styles.profileInfo__username__withFullName
							}
						>
							@{user.username}
						</span>
					</div>
					<div className={styles.profileInfo__followLists}>
						<Link to={`/${user.username}/followers`}>
							{user.followers.length} Followers
						</Link>
						<Link to={`/${user.username}/following`}>
							{user.following.length} Following
						</Link>
					</div>

					{authUser && authUser.username !== user.username && (
						<FollowButton user={user} />
					)}
				</div>
			)}

			{status === Status.ERROR && (
				<EmptyCard emoji='😢' border={false} gradient={false}>
					Could not load user
				</EmptyCard>
			)}
		</div>
	);
};

export default memo(ProfileInfo);
