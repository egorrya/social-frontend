import { useCallback, useEffect } from 'react';
import { getMe } from '../state/auth/asyncActions';
import { useAppDispatch } from './../state/store';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token && token !== 'undefined') {
      dispatch(getMe());
    } else {
      localStorage.removeItem('token');
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
};
