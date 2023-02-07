import { FC } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

import PageLayout from '../components/layouts/PageLayout';
import CreatePost from '../components/screens/CreatePost';
import Posts from '../components/screens/Posts';

// todo: create post logic
// todo: add a post comment logic
// todo: add a post delete logic
// todo: add a post edit logic
// todo: add my profile page

const Home: FC = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <PageLayout>
      {loggedIn && <CreatePost />}
      <Posts />
    </PageLayout>
  );
};

export default Home;
