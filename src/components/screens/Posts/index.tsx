import { Status } from '../../../types/fetchStatus';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { getAllPosts } from '../../../state/posts/asyncActions';
import { clearPosts } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';

import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { scrollToTop } from '../../../utils/scrollToTop';

import PostCard from '../../ui/PostCard';

const Posts = () => {
  const dispatch = useAppDispatch();

  const { posts, status, lastPage } = useSelector(
    (state: RootState) => state.posts
  );
  const { loggedInWithSubmit } = useSelector((state: RootState) => state.auth);

  const { page, setPage, hasMore, setHasMore, setObserverTarget } =
    useInfiniteScroll(500);

  useEffect(() => {
    dispatch(getAllPosts({ page }));
  }, [dispatch, page]);

  useEffect(() => {
    if (lastPage && page === lastPage) setHasMore(false);
  }, [page, lastPage, setHasMore]);

  useEffect(() => {
    if (loggedInWithSubmit) {
      dispatch(clearPosts());
      scrollToTop();
      if (lastPage && lastPage > 1) setHasMore(true);
      if (page > 1) setPage(1);
      if (page === 1) dispatch(getAllPosts({ page }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInWithSubmit]);

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          text={post.text}
          postId={post._id}
          likesCount={post.likesCount}
          postComments={post.post_comments}
          isLiked={post.isLiked}
          isOwnPost={post.isOwnPost}
        />
      ))}

      {hasMore && status === Status.SUCCESS && (
        <div ref={setObserverTarget}></div>
      )}

      {status === Status.SUCCESS && !hasMore && <div>No more posts</div>}

      {status === Status.LOADING && <div>Loading...</div>}

      {status === Status.ERROR && <div>Error</div>}
    </div>
  );
};
export default Posts;
