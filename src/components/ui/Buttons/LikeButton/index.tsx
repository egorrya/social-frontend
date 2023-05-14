import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostsApi } from '../../../../services/api/PostsApi';
import { RootState, useAppDispatch } from '../../../../state/store';
import { Status } from '../../../../types/fetchStatus';

import { setActiveModalId } from '../../../../state/modal/slice';
import styles from './LikeButton.module.scss';

interface LikeButtonProps {
	likes: string[];
	postId: string;
}

const LikeButton: FC<LikeButtonProps> = ({ likes, postId }) => {
	const dispatch = useAppDispatch();

	const { user: authUser } = useSelector((state: RootState) => state.auth);

	const [isLiked, setIsLiked] = useState(false);
	const [likesCount, setLikesCount] = useState(likes.length);
	const [likeStatus, setLikeStatus] = useState(Status.NEVER);

	useEffect(() => {
		setIsLiked(authUser ? likes?.includes(authUser?._id) : false);
	}, [authUser, likes]);

	const handleLike = async () => {
		if (!authUser) {
			dispatch(setActiveModalId('login'));
			return;
		}
		if (likeStatus === Status.LOADING) return;

		await setLikeStatus(Status.LOADING);

		await PostsApi.toggleLike(postId)
			.then((data) => {
				setLikeStatus(Status.SUCCESS);
				setLikesCount(data.likesCount);
				setIsLiked(!isLiked);
			})
			.catch((err) => {
				setLikeStatus(Status.ERROR);
			});
	};

	const likeScenarios = () => {
		if (likeStatus === Status.ERROR) return <div>Like Error</div>;

		return (
			<>
				<span className={styles.likeIcon}>
					<div className={styles.heartAnimation1}></div>
					<div className={styles.heartAnimation2}></div>
				</span>
				<div className={styles.likesCount}>{likesCount}</div>
			</>
		);
	};

	return (
		<div
			className={`${styles.likeButton} ${isLiked && styles.liked}`}
			onClick={handleLike}
		>
			{likeScenarios()}
		</div>
	);
};

export default LikeButton;
