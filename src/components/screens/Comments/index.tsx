import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { getAllComments } from '../../../state/comments/asyncActions';
import { clearComments } from '../../../state/comments/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
import CommentCard from '../../ui/CommentCard';
import EmptyCard from '../../ui/EmptyCard';

interface CommentsProps {
	postId: string | undefined;
}

const SCROLL_DELAY = 100;

const Comments: FC<CommentsProps> = ({ postId }) => {
	const dispatch = useAppDispatch();

	const [before, setBefore] = useState<string>('');

	const { comments, status, lastPage, currentPage, error } = useSelector(
		(state: RootState) => state.comments
	);

	const { page, hasMore, setObserverTarget } = useInfiniteScroll(
		currentPage,
		lastPage,
		SCROLL_DELAY
	);

	useEffect(() => {
		if (postId && hasMore && before)
			dispatch(getAllComments({ postId, page, before }));
	}, [dispatch, hasMore, page, postId, before]);

	useEffect(() => {
		setBefore(new Date().toISOString());
	}, [setBefore]);

	useEffect(() => {
		return () => {
			dispatch(clearComments());
		};
	}, [dispatch]);

	return (
		<div>
			{comments.map((comment) => (
				<CommentCard key={comment._id} commentData={comment} />
			))}

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget}></div>
			)}

			{!hasMore && comments.length === 0 && status === Status.SUCCESS && (
				<EmptyCard emoji='🦭' gradient={false}>
					There are no comments yet. Be first
				</EmptyCard>
			)}

			{status === Status.ERROR && (
				<EmptyCard emoji='😢' gradient={false}>
					{error as string}
				</EmptyCard>
			)}
		</div>
	);
};

export default Comments;
