import { FC } from 'react';

interface CommentsProps {
  postId: string | undefined;
}

const Comments: FC<CommentsProps> = ({ postId }) => {
  console.log(postId);
  return <></>;
};

export default Comments;
