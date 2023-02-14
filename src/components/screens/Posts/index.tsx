import { Status } from '../../../types/fetchStatus';

import { FC, LegacyRef, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../state/store';

import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { scrollToTop } from '../../../utils/scrollToTop';

import { getPosts } from '../../../state/posts/asyncActions';
import PostCard from '../../ui/PostCard';

interface PostsProps {
	filter: 'all' | 'feed' | 'popular';
	username?: string;

	likes?: number;
	sort?: 'asc' | 'desc';
	limit?: number;
	page?: number;
}

interface UserPostsState {
	filter: 'user_posts';
	username: string;

	likes?: number;
	sort?: 'asc' | 'desc';
	limit?: number;
	page?: number;
}

const Posts: FC<PostsProps | UserPostsState> = ({ filter, username }) => {
	const firstRender = useRef(true);

	const dispatch = useAppDispatch();

	const { posts, status, lastPage, currentPage } = useSelector(
		(state: RootState) => state.posts
	);
	const { loggedInWithSubmit } = useSelector((state: RootState) => state.auth);

	const { page, hasMore, setObserverTarget } = useInfiniteScroll(
		currentPage,
		lastPage,
		500
	);

	useEffect(() => {
		if (hasMore) dispatch(getPosts({ filter, page, username, loadNew: true }));
	}, [dispatch, page, hasMore, filter, username]);

	useEffect(() => {
		if (!firstRender.current) {
			scrollToTop();
			dispatch(getPosts({ filter, username, page: 1, loadNew: false }));
		} else {
			firstRender.current = false;
		}
	}, [loggedInWithSubmit, filter, dispatch, username]);

	return (
		<div>
			{posts.map(post => (
				<PostCard
					key={post._id}
					postId={post._id}
					username={post.user.username}
					{...post}
					isSinglePostPage={false}
				/>
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
