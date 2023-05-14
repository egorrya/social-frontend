import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './CommentButton.module.scss';

interface CommentButtonProps {
	commentsCount: number;
	postId: string;
}

const CommentButton: FC<CommentButtonProps> = ({ commentsCount, postId }) => {
	return (
		<Link className={styles.commentButton} to={`/posts/${postId}`}>
			<span className={styles.commentIcon}></span>
			<div className={styles.commentCount}>{commentsCount}</div>
		</Link>
	);
};

export default CommentButton;
