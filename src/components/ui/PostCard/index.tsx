import { FC, memo, useState } from 'react';
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

const PostCard: FC<PostCardProps> = ({
	postId,

	username,
	createdAt,
	text,
	likesCount: likes,
	commentsCount,
	isLiked: liked,
	isOwnPost,

	isSinglePostPage = true,
}) => {
	const dispatch = useAppDispatch();

	const { loggedIn } = useSelector((state: RootState) => state.auth);
	const { editableId } = useSelector((state: RootState) => state.postEdit);

	const [likesCount, setLikesCount] = useState(likes);
	const [isLiked, setIsLiked] = useState(liked);
	const [likeStatus, setLikeStatus] = useState(Status.NEVER);

	const handleLike = async () => {
		await setLikeStatus(Status.LOADING);

		await PostsApi.toggleLike(postId)
			.then(async data => {
				setLikeStatus(Status.SUCCESS);
				setLikesCount(data.likesCount);
				setIsLiked(data.isLiked);
			})
			.catch(err => {
				setLikeStatus(Status.ERROR);
			});
	};

	const handleDelete = () => {
		const shouldDelete = window.confirm(
			'Are you sure you want to delete this post?'
		);

		if (!shouldDelete) return;

		PostsApi.deletePost(postId).then(() => {
			// if (isSinglePostPage) {}
			if (!isSinglePostPage) dispatch(deletePost(postId));
		});
		// TODO: add success notification
		// TODO: add error notification
	};

	const handleEdit = () => {
		dispatch(changeEditableId(postId));
	};

	if (editableId && editableId === postId)
		return (
			<>
				<PostForm type='edit' textareaValue={text} />
				<button onClick={() => dispatch(changeEditableId(null))}>Cancel</button>
			</>
		);

	const content = () => {
		return (
			<>
				<h3>{text}</h3>
				<div>{likesCount} likes</div>
				<div>{commentsCount} comments</div>
			</>
		);
	};

	return (
		<div>
			<Link to={`/${username}`}>
				<div>{username}</div>
				<div>{createdAt}</div>
			</Link>

			{!isSinglePostPage ? (
				<Link to={`/posts/${postId}`}>{content()}</Link>
			) : (
				content()
			)}

			{loggedIn && (
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
