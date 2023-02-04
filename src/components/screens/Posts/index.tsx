import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useInfiniteLoad } from '../../../hooks/useInfiniteLoad';
import { getAllPosts } from '../../../state/posts/asyncActions';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';

import PostCard from '../../ui/PostCard';

const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts, status, lastPage } = useSelector(
    (state: RootState) => state.posts
  );

  const { page, hasMore, setHasMore, setObserverTarget } = useInfiniteLoad();

  useEffect(() => {
    if (lastPage && page === lastPage) {
      setHasMore(false);
    }

    dispatch(getAllPosts({ page }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} {...post} />
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
