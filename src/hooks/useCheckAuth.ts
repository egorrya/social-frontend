import { useEffect } from 'react';
import { getMe } from '../state/auth/asyncActions';
import { setStatusSuccess } from '../state/auth/slice';
import { useAppDispatch } from './../state/store';

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  const checkAuth = () => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(getMe());
    } else {
      dispatch(setStatusSuccess());
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
