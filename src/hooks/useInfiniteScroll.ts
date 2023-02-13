import { useEffect, useRef, useState } from 'react';
/**
 * useInfiniteScroll hook for managing infinite scrolling
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
 * const { page, setPage, hasMore, setHasMore, observerTarget, setObserverTarget } = useInfiniteScroll(currentPage, lastPage, 100);
 *
 */

export const useInfiniteScroll = (
  currentPage: number = 1,
  lastPage: number | null,
  offset: number = 300
) => {
  const [page, setPage] = useState(currentPage);

  const [hasMore, setHasMore] = useState(() => {
    if (!lastPage || page < lastPage) return true;
    if (lastPage && page >= lastPage) return false;
    if (page < 1) return false;
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const [observerTarget, setObserverTarget] = useState<null | HTMLDivElement>(
    null
  );

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      {
        rootMargin: `0px 0px ${offset}px 0px`,
        threshold: 0,
      }
    );
  }, [offset]);

  useEffect(() => {
    if (observerTarget) {
      observer.current?.observe(observerTarget);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [observerTarget]);

  useEffect(() => {
    if (lastPage && page >= lastPage) setHasMore(false);
  }, [page, lastPage, setHasMore]);

  return {
    page,
    setPage,
    hasMore,
    setHasMore,
    observerTarget,
    setObserverTarget,
  };
};
