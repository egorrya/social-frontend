import { useEffect, useRef, useState } from 'react';
/**
 * useInfiniteLoad hook for managing infinite scrolling
 *
 * @returns {Object} - an object with the following properties:
 *   - page: the current page number
 *   - setPage: a function for updating the current page number
 *   - hasMore: a boolean indicating whether there are more items to load
 *   - setHasMore: a function for updating the hasMore boolean
 *   - observerTarget: a reference to the target element for the IntersectionObserver
 *   - setObserverTarget: a function for setting the observerTarget reference
 *
 * Example Usage:
 *
 * const { page, setPage, hasMore, setHasMore, observerTarget, setObserverTarget } = useInfiniteLoad();
 *
 */

export const useInfiniteLoad = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);
  const [observerTarget, setObserverTarget] = useState<null | HTMLDivElement>(
    null
  );

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
  }, []);

  useEffect(() => {
    if (observerTarget) {
      observer.current?.observe(observerTarget);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [observerTarget]);

  return {
    page,
    setPage,
    hasMore,
    setHasMore,
    observerTarget,
    setObserverTarget,
  };
};
