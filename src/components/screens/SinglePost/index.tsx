import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPost } from '../../../state/posts/asyncActions';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
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

	if (status === Status.LOADING) return <div>Loading...</div>;

	if (status === Status.ERROR) return <div>{error as string}</div>;

	return (
		<>
			{post && status === Status.SUCCESS && (
				<PostCard key={post._id} postData={post} isSinglePostPage={false} />
			)}
		</>
	);
};

export default SinglePost;
