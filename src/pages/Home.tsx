import { FC } from 'react';
import PageLayout from '../components/layouts/PageLayout';
import Posts from '../components/screens/Posts';

// todo: add a header with login and register buttons else show logout button
// todo: do a sign up logic
// todo: create post logic
// todo: add a post comment logic
// todo: check if the user is logged in and show the appropriate buttons
// todo: add a post delete logic
// todo: add a post edit logic
// todo: add my profile page

const Home: FC = () => {
  return (
    <PageLayout>
      <Posts />
    </PageLayout>
  );
};

export default Home;
