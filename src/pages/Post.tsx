import { useParams } from 'react-router-dom';
import PageLayout from '../components/layouts/PageLayout';

import Comments from '../components/screens/Comments';
import SinglePost from '../components/screens/SinglePost';

const Post = () => {
  const { id } = useParams();

  return (
    <PageLayout>
      <SinglePost postId={id} />
      <Comments postId={id} />
    </PageLayout>
  );
};

export default Post;
