import { Status } from '../../../types/fetchStatus';

import { FC, useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../state/store';

import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

import { getPosts } from '../../../state/posts/asyncActions';
import { scrollToTop } from '../../../utils/scrollToTop';
import stringifyObj from '../../../utils/stringifyObj';
import PostCard from '../../ui/PostCard';

interface PostsProps {
	filter: 'all' | 'feed' | 'popular';
	username?: string;

	likes?: number;
	sort?: 'asc' | 'desc';
	limit?: number;
}

interface UserPostsState {
	filter: 'user_posts';
	username: string;

	likes?: number;
	sort?: 'asc' | 'desc';
	limit?: number;
}

const Posts: FC<PostsProps | UserPostsState> = ({ filter, username }) => {
	const dispatch = useAppDispatch();

	const { posts, status, lastPage, currentPage, activeFilter } = useSelector(
		(state: RootState) => state.posts
	);

	const { page, setPage, hasMore, setHasMore, setObserverTarget } =
		useInfiniteScroll(currentPage, lastPage, 500);

	const handleDispatch = useCallback(
		(page: number, clearPosts?: boolean) => {
			dispatch(getPosts({ filter, username, page, clearPosts }));
		},
		[dispatch, filter, username]
	);

	const activeFilterString = stringifyObj({ filter, username });

	useEffect(() => {
		if (hasMore && status === Status.SUCCESS && page > 1) handleDispatch(page);
	}, [page, hasMore, status, dispatch, handleDispatch]);

	useEffect(() => {
		if (posts.length === 0 || activeFilter !== activeFilterString) {
			scrollToTop();
			setPage(1);
			setHasMore(true);
			handleDispatch(1, true);
		}
	}, [
		activeFilter,
		activeFilterString,
		handleDispatch,
		posts.length,
		setHasMore,
		setPage,
	]);

	return (
		<div>
			{posts.map((post) => (
				<PostCard key={post._id} postData={post} isSinglePostPage={false} />
			))}

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget}></div>
			)}

			{status === Status.SUCCESS && !hasMore && (
				<div>No {posts.length > 0 && 'more'} posts</div>
			)}

			{status === Status.LOADING && <div>Loading...</div>}

			{status === Status.ERROR && <div>Error</div>}
		</div>
	);
};
export default Posts;
