import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import PageLayout from '../components/layouts/PageLayout';
import Comments from '../components/screens/Comments';
import CommentForm from '../components/screens/Forms/CommentForm';
import SinglePost from '../components/screens/SinglePost';
import { RootState } from '../state/store';

const Post: FC = () => {
	const { id } = useParams();

	const { loggedIn } = useSelector((state: RootState) => state.auth);

	return (
		<PageLayout>
			<SinglePost postId={id} />
			{loggedIn && <CommentForm postId={id} />}
			<Comments postId={id} />
		</PageLayout>
	);
};

export default Post;
