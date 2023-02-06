import { logOut } from '../state/auth/slice';
import { useAppDispatch } from './../state/store';

export const handleLogout = () => {
  const dispatch = useAppDispatch();

  localStorage.removeItem('token');
  dispatch(logOut());
};
