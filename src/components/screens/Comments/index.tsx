import { FC, LegacyRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { getAllComments } from '../../../state/comments/asyncActions';
import { clearComments } from '../../../state/comments/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

interface CommentsProps {
	postId: string | undefined;
}

const Comments: FC<CommentsProps> = ({ postId }) => {
	const dispatch = useAppDispatch();

	const { comments, status, lastPage, currentPage, error } = useSelector(
		(state: RootState) => state.comments
	);

	const { page, hasMore, setObserverTarget } = useInfiniteScroll(
		currentPage,
		lastPage,
		100
	);

	useEffect(() => {
		if (postId && hasMore) dispatch(getAllComments({ postId, page }));
	}, [dispatch, hasMore, page, postId]);

	useEffect(() => {
		return () => {
			dispatch(clearComments());
		};
	}, [dispatch]);

	return (
		<div>
			{comments.map(comment => (
				<div key={comment._id}>
					<div>{comment.user.username}</div>
					<div>{comment.text}</div>
				</div>
			))}

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget as LegacyRef<HTMLDivElement>}></div>
			)}

			{status === Status.SUCCESS && !hasMore && (
				<div>No {comments.length > 0 && 'more'} comments</div>
			)}
			{status === Status.LOADING && <div>Loading...</div>}

			{status === Status.ERROR && <div>{error as string}</div>}
		</div>
	);
};

export default Comments;
