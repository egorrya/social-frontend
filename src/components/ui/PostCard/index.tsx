import { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostsApi } from '../../../services/api/PostsApi';
import { changeEditableId } from '../../../state/posts/postEditSlice';
import { deletePost } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';

import PostForm from '../PostForm';
import { PostCardProps } from './types';

import dateChanger from '../../../utils/dateChanger';
import Button from '../Button';
import LikeButton from '../LikeButton';
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

		PostsApi.deletePost(postData._id).then(() => {
			if (isSinglePostPage) window.location.href = '/';
			if (!isSinglePostPage) dispatch(deletePost(postData._id));
		});
		// TODO: add success notification
		// TODO: add error notification
	};

	const handleEdit = () => {
		dispatch(changeEditableId(postData._id));
	};

	if (editableId && editableId === postData._id)
		return (
			<>
				<PostForm type='edit' textareaValue={postData.text} />
				<button onClick={() => dispatch(changeEditableId(null))}>Cancel</button>
			</>
		);

	return (
		<>
			<div className={styles.card}>
				<Link className={styles.card__header} to={`/${postData.user.username}`}>
					<div className={styles.card__avatar}>
						{postData.user.username.split('')[0]}
					</div>
					<div className={styles.card__info}>
						<p>{postData.user.username}</p>
						<p>{dateChanger(postData.createdAt)}</p>
					</div>
				</Link>

				{!isSinglePostPage ? (
					<Link className={styles.card__body} to={`/posts/${postData._id}`}>
						<p>{postData.text}</p>
					</Link>
				) : (
					<div className={styles.card__body}>
						<p>{postData.text}</p>
					</div>
				)}

				<LikeButton postId={postData._id} likes={postData.post_likes} />
			</div>

			{isOwnPost && (
				<div style={{ marginBottom: '1rem' }}>
					<Button onClick={handleDelete} text='Delete' />
					<Button onClick={handleEdit} text='Edit' />
				</div>
			)}
		</>
	);
};

export default memo(PostCard);
