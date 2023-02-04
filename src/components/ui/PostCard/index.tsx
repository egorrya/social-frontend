import { FC } from 'react';

interface PostCardProps {
  text: string;
  _id: string;
}

const PostCard: FC<PostCardProps> = ({ text, _id }) => {
  return (
    <div>
      <h3>{text}</h3>
      <p>{_id}</p>
    </div>
  );
};

export default PostCard;
