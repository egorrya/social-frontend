import { useEffect } from 'react';

export const useScrollPosition = () => {
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const scrollPosition = sessionStorage.getItem('scrollPosition');

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      sessionStorage.removeItem('scrollPosition');
    }

    return () => handleScroll();
  }, []);
};
