import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import PageLayout from '../components/layouts/PageLayout';
import Posts from '../components/screens/Posts';
import PostForm from '../components/ui/PostForm';

// todo: add single post page
// todo: add comments on single post page
// todo: add a comment delete logic
// todo: add my profile page
// todo: add following and followers pages

const Home: FC = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <PageLayout>
      {loggedIn && <PostForm type='create' />}
      <Posts />
    </PageLayout>
  );
};

export default Home;
