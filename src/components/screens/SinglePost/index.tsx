import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPost } from '../../../state/posts/asyncActions';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
import Loader from '../../ui/Loader';
import PostCard from '../../ui/PostCard';

interface SinglePostProps {
	postId: string | undefined;
}

const SinglePost: FC<SinglePostProps> = ({ postId }) => {
	const dispatch = useAppDispatch();

	const { loggedInWithSubmit } = useSelector((state: RootState) => state.auth);

	const { post, status, error } = useSelector(
		(state: RootState) => state.singlePost
	);

	useEffect(() => {
		if (postId) dispatch(getPost(postId));
	}, [dispatch, postId]);

	useEffect(() => {
		if (loggedInWithSubmit && postId) dispatch(getPost(postId));
	}, [dispatch, loggedInWithSubmit, postId]);

	if (status === Status.LOADING) return <Loader />;

	if (status === Status.ERROR) return <div>{error as string}</div>;

	return (
		<>
			{post && (
				<PostCard key={post._id} postData={post} isSinglePostPage={true} />
			)}
		</>
	);
};

export default SinglePost;
