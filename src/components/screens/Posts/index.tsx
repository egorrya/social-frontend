import { Status } from '../../../types/fetchStatus';

import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { getAllPosts } from '../../../state/posts/asyncActions';
import { clearPosts } from '../../../state/posts/slice';
import { RootState, useAppDispatch } from '../../../state/store';

import { useInfiniteLoad } from '../../../hooks/useInfiniteLoad';
import { scrollToTop } from '../../../utils/scrollToTop';

import PostCard from '../../ui/PostCard';

const Posts = () => {
  const dispatch = useAppDispatch();

  const { posts, status, lastPage } = useSelector(
    (state: RootState) => state.posts
  );
  const { loggedInWithSubmit } = useSelector((state: RootState) => state.auth);

  const { page, setPage, hasMore, setHasMore, setObserverTarget } =
    useInfiniteLoad();

  // get posts on page change
  useEffect(() => {
    if (lastPage && page === lastPage) setHasMore(false);

    dispatch(getAllPosts({ page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // reset page to 1 and clear posts when user logs in
  useEffect(() => {
    if (loggedInWithSubmit) {
      dispatch(clearPosts());

      scrollToTop();

      if (lastPage && lastPage > 1) setHasMore(true);

      if (page > 1) {
        setPage(1);
      } else if (page === 1) {
        dispatch(getAllPosts({ page }));
      }
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
        />
      ))}

      {hasMore && status === Status.SUCCESS && (
        <div ref={setObserverTarget}>load more</div>
      )}

      {status === Status.SUCCESS && !hasMore && <div>No more posts</div>}

      {status === Status.LOADING && <div>Loading...</div>}

      {status === Status.ERROR && <div>Error</div>}
    </div>
  );
};
export default Posts;
