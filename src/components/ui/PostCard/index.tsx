import { FC, memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostsApi } from '../../../services/api/PostsApi';
import { deletePost } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

import LikeButton from '../LikeButton';

interface PostCardProps {
  text: string;
  postId: string;
  likesCount: number;
  postComments: any[];
  isLiked: boolean;
}

const PostCard: FC<PostCardProps> = ({
  text,
  postId,
  likesCount: likes,
  postComments,
  isLiked: liked,
}) => {
  const dispatch = useAppDispatch();

  const { loggedIn } = useSelector((state: RootState) => state.auth);

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
    // todo: add confirmation
    PostsApi.deletePost(postId).then(() => {
      dispatch(deletePost(postId));
    });
    // todo: add success notification

    // todo: add error notification
  };

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
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default memo(PostCard);
