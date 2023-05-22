import { Status } from '../../../types/fetchStatus';

import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';
import { getPosts } from '../../../state/posts/asyncActions';
import { clearPosts } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';

import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

import stringifyObj from '../../../utils/stringifyObj';
import EmptyCard from '../../ui/EmptyCard';
import Loader from '../../ui/Loader';
import PostCard from '../../ui/PostCard';
import { PostsProps, UserPostsState } from './types';

import styles from './Posts.module.scss';

const POSTS_PER_PAGE = 20;
const SCROLL_DELAY = 500;

const Posts: FC<PostsProps | UserPostsState> = ({ filter, username }) => {
	const dispatch = useAppDispatch();

	const [before, setBefore] = useState<string>('');

	const { posts, status, lastPage, currentPage, activeFilter, deleted } =
		useSelector((state: RootState) => state.posts);

	const { page, setPage, hasMore, setObserverTarget } = useInfiniteScroll(
		currentPage,
		lastPage,
		SCROLL_DELAY
	);

	const handleDispatch = useCallback(
		(page: number, clearPosts?: boolean) => {
			dispatch(getPosts({ filter, username, page, clearPosts, before }));
		},
		[dispatch, filter, username, before]
	);

	const activeFilterString = useMemo(
		() => stringifyObj({ filter, username, before }),
		[filter, username, before]
	);

	useEffect(() => {
		setBefore(new Date().toISOString());
	}, [setBefore]);

	useEffect(() => {
		if (
			hasMore &&
			status === Status.SUCCESS &&
			page > currentPage &&
			page > 1
		) {
			handleDispatch(page);
		}
	}, [page, hasMore, status, handleDispatch, currentPage]);

	useEffect(() => {
		if (
			deleted &&
			deleted % POSTS_PER_PAGE === 1 &&
			lastPage &&
			lastPage > currentPage
		) {
			handleDispatch(page);
		}
	}, [currentPage, deleted, lastPage, page, handleDispatch]);

	useEffect(() => {
		if (
			before &&
			((!activeFilter && posts.length === 0) ||
				activeFilter !== activeFilterString)
		) {
			dispatch(clearPosts());
			handleDispatch(1, true);

			setPage(1);
		}
	}, [
		activeFilter,
		activeFilterString,
		before,
		posts.length,
		handleDispatch,
		setPage,
		dispatch,
	]);

	return (
		<>
			<div className={styles.posts}>
				{posts.map((post) => (
					<PostCard key={post._id} postData={post} isSinglePostPage={false} />
				))}
			</div>

			{hasMore && status === Status.SUCCESS && (
				<div ref={setObserverTarget}>Load More</div>
			)}

			{!hasMore && status === Status.SUCCESS && (
				<EmptyCard emoji='🤷‍♂️' border={false} gradient={false}>
					No {posts.length > 0 && 'more'} posts
				</EmptyCard>
			)}

			{status === Status.ERROR && (
				<EmptyCard emoji='😢' border={false} gradient={false}>
					Hm, Something went wrong
				</EmptyCard>
			)}

			{status === Status.LOADING && <Loader />}
		</>
	);
};
export default memo(Posts);
