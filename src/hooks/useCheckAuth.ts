import { useEffect } from 'react';
import { getMe } from './../state/login/asyncActions';
import { useAppDispatch } from './../state/store';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  const checkAuth = () => {
    const token = localStorage.getItem('token');

    if (token) dispatch(getMe());
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
