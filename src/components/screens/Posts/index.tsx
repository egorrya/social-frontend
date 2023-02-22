import { Status } from '../../../types/fetchStatus';

import { FC, LegacyRef, useCallback, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../state/store';

import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

import { getPosts } from '../../../state/posts/asyncActions';
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

const Posts: FC<PostsProps | UserPostsState> = ({
	filter,
	username,
	likes,
	sort,
	limit,
}) => {
	const dispatch = useAppDispatch();

	const { posts, status, lastPage, currentPage } = useSelector(
		(state: RootState) => state.posts
	);

	const { page, setPage, hasMore, setHasMore, setObserverTarget } =
		useInfiniteScroll(currentPage, lastPage, 500);

	const handleDispatch = useCallback(
		(page: number, clearPosts?: boolean) => {
			dispatch(
				getPosts({ filter, page, likes, sort, limit, clearPosts, username })
			);
		},
		[dispatch, filter, likes, sort, limit, username]
	);

	useEffect(() => {
		if (hasMore && status === Status.SUCCESS && page > 1) handleDispatch(page);
	}, [page, hasMore, status, dispatch, handleDispatch]);

	useEffect(() => {
		setPage(1);
		setHasMore(true);
		handleDispatch(1, true);
	}, [handleDispatch, setHasMore, setPage]);

	return (
		<div>
			{posts.map((post) => (
				<PostCard key={post._id} postData={post} isSinglePostPage={false} />
			))}

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget as LegacyRef<HTMLDivElement>}></div>
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
