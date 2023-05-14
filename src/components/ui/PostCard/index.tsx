import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostsApi } from '../../../services/api/PostsApi';
import { changeEditableId } from '../../../state/posts/postEditSlice';
import { deletePost } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';

import PostForm from '../../screens/Forms/PostForm';
import { PostCardProps } from './types';

import { openPopup } from '../../../state/notificationPopup/slice';
import dateChanger from '../../../utils/dateChanger';
import Button from '../Buttons/Button';
import CommentButton from '../Buttons/CommentButton';
import LikeButton from '../Buttons/LikeButton';
import LazyImage from '../LazyImage';
import UserAvatar from '../UserAvatar';
import styles from './PostCard.module.scss';

const PostCard: FC<PostCardProps> = ({ postData, isSinglePostPage }) => {
	const dispatch = useAppDispatch();

	const { user: authUser } = useSelector((state: RootState) => state.auth);
	const { editableId } = useSelector((state: RootState) => state.postEdit);
	const [isOwnPost, setIsOwnPost] = useState(false);

	useEffect(() => {
		setIsOwnPost(authUser ? authUser._id === postData.user._id : false);
	}, [authUser, postData]);

	const handleDelete = () => {
		const shouldDelete = window.confirm(
			'Are you sure you want to delete this post?'
		);

		if (!shouldDelete) return;

		PostsApi.deletePost(postData._id)
			.then(() => {
				if (isSinglePostPage) window.history.back();

				if (!isSinglePostPage) dispatch(deletePost(postData._id));

				dispatch(
					openPopup({
						message: 'Post deleted successfully',
						status: 'success',
					})
				);
			})
			.catch(() => {
				dispatch(
					openPopup({ message: 'Something went wrong', status: 'error' })
				);
			});
	};

	const handleEdit = () => {
		dispatch(changeEditableId(postData._id));
	};

	if (editableId && editableId === postData._id)
		return (
			<div style={{ marginBottom: '1rem' }}>
				<PostForm
					type='edit'
					textareaValue={postData.text}
					imageUrlValue={postData.imageUrl}
					isSinglePostPage={isSinglePostPage}
				/>
				<Button onClick={() => dispatch(changeEditableId(null))}>Cancel</Button>
			</div>
		);

	return (
		<>
			<div className={styles.card}>
				<Link className={styles.card__header} to={`/${postData.user.username}`}>
					<UserAvatar
						size='small'
						username={postData.user.username}
						imageSrc={postData.user.avatar}
					/>
					<div className={styles.card__info}>
						<p>
							{postData.user.fullName
								? postData.user.fullName
								: `@${postData.user.username}`}
						</p>
						<p>{dateChanger(postData.createdAt)}</p>
					</div>
				</Link>

				{postData.text && (
					<Link className={styles.card__text} to={`/posts/${postData._id}`}>
						<p>{postData.text}</p>
					</Link>
				)}

				{postData.imageUrl && (
					<Link className={styles.card__image} to={`/posts/${postData._id}`}>
						<LazyImage src={postData.imageUrl} alt='Post image' />
					</Link>
				)}

				<div className={styles.card__buttons}>
					<LikeButton postId={postData._id} likes={postData.post_likes} />
					<CommentButton
						postId={postData._id}
						commentsCount={postData.commentsCount}
					/>
				</div>
			</div>

			{isOwnPost && (
				<div style={{ marginBottom: '1rem' }}>
					<Button onClick={handleDelete}>Delete</Button>
					<Button onClick={handleEdit}>Edit</Button>
				</div>
			)}
		</>
	);
};

export default PostCard;
