import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from '../../../types';
import dateChanger from '../../../utils/dateChanger';
import UserAvatar from '../UserAvatar';

import styles from './CommentCard.module.scss';

interface CommentCardProps {
	commentData: Comment;
}

const CommentCard: FC<CommentCardProps> = ({ commentData }) => {
	return (
		<div className={styles.card}>
			<Link
				className={styles.card__header}
				to={`/${commentData.user.username}`}
			>
				<UserAvatar
					size='small'
					username={commentData.user.username}
					imageSrc={commentData.user.avatar}
				/>
				<div className={styles.card__info}>
					<p>
						{commentData.user.fullName
							? commentData.user.fullName
							: `@${commentData.user.username}`}
					</p>
					<p>{dateChanger(commentData.createdAt)}</p>
				</div>
			</Link>
			<p className={styles.card__body}>{commentData.text}</p>
		</div>
	);
};

export default CommentCard;
