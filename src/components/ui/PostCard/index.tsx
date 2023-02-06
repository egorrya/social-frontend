import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { PostsApi } from '../../../services/api/PostsApi';
import { RootState } from '../../../state/store';
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

  return (
    <div>
      <h3>{text}</h3>
      <p>{postId}</p>
      <div>{likesCount} likes</div>
      <div>{postComments.length} comments</div>

      {loggedIn && (
        <LikeButton
          likeStatus={likeStatus}
          isLiked={isLiked}
          handleLike={handleLike}
        />
      )}
    </div>
  );
};

export default PostCard;
