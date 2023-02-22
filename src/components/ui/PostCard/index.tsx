import { FC, memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostsApi } from '../../../services/api/PostsApi';
import { changeEditableId } from '../../../state/posts/postEditSlice';
import { deletePost } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

import LikeButton from '../LikeButton';
import PostForm from '../PostForm';
import { PostCardProps } from './types';

const PostCard: FC<PostCardProps> = ({ postData, isSinglePostPage }) => {
	const dispatch = useAppDispatch();

	const { user: authUser } = useSelector((state: RootState) => state.auth);
	const { editableId } = useSelector((state: RootState) => state.postEdit);

	const [isLiked, setIsLiked] = useState(false);
	const [isOwnPost, setIsOwnPost] = useState(false);
	const [likesCount, setLikesCount] = useState(postData.likesCount);
	const [likeStatus, setLikeStatus] = useState(Status.NEVER);

	useEffect(() => {
		if (authUser) {
			setIsOwnPost(authUser._id === postData.user._id);
			setIsLiked(postData.post_likes?.includes(authUser._id));
		}
	}, [authUser, postData]);

	const handleLike = async () => {
		await setLikeStatus(Status.LOADING);

		await PostsApi.toggleLike(postData._id)
			.then((data) => {
				setLikeStatus(Status.SUCCESS);
				setLikesCount(data.likesCount);
				setIsLiked(!isLiked);
			})
			.catch((err) => {
				setLikeStatus(Status.ERROR);
			});
	};

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

	const content = () => {
		return (
			<>
				<h3>{postData.text}</h3>
				<div>{likesCount} likes</div>
				<div>{postData.commentsCount} comments</div>
			</>
		);
	};

	return (
		<div>
			<Link to={`/${postData.user.username}`}>
				<div>{postData.user.username}</div>
				<div>{postData.createdAt}</div>
			</Link>

			{!isSinglePostPage ? (
				<Link to={`/posts/${postData._id}`}>{content()}</Link>
			) : (
				content()
			)}

			{authUser && (
				<>
					<LikeButton
						likeStatus={likeStatus}
						isLiked={isLiked}
						handleLike={handleLike}
					/>
					{isOwnPost && (
						<>
							<button onClick={handleDelete}>Delete</button>
							<button onClick={handleEdit}>Edit</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default memo(PostCard);
