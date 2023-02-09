import { FC, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostsApi } from '../../../services/api/PostsApi';
import { changeEditableId } from '../../../state/postEdit/slice';
import { deletePost } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

import LikeButton from '../LikeButton';
import PostForm from '../PostForm';

interface PostCardProps {
  postId: string;
  text: string;
  likesCount: number;
  postComments: any[];
  isLiked: boolean;
  isOwnPost: boolean;
}

const PostCard: FC<PostCardProps> = ({
  postId,
  text,
  likesCount: likes,
  postComments,
  isLiked: liked,
  isOwnPost,
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
      .then((data) => {
        setLikeStatus(Status.SUCCESS);
        setLikesCount(data.likesCount);
        setIsLiked(data.isLiked);
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

    PostsApi.deletePost(postId).then(() => {
      dispatch(deletePost(postId));
    });
    // todo: add success notification
    // todo: add error notification
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

  return (
    <div>
      <h3>{text}</h3>
      <p>{postId}</p>
      <div>{likesCount} likes</div>
      <div>{postComments.length} comments</div>

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
