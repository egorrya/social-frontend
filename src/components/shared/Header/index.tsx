import { FC } from 'react';
import { useSelector } from 'react-redux';
import { logOut } from '../../../state/auth/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
import LogInModal from '../../screens/LogInModal';
import SignInModal from '../../screens/SignInModal';

const Header: FC = () => {
  const dispatch = useAppDispatch();

  const { loggedIn, user, status } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
  };

  const authSectionButtons = () => {
    if (status === Status.LOADING) return <div>Loading...</div>;

    if (status === Status.ERROR) return <div>Error</div>;

    if (loggedIn)
      return (
        <>
          <div>{user?.username}</div>
          <button onClick={handleLogout}>Logout</button>
        </>
      );

    if (!loggedIn)
      return (
        <>
          <LogInModal />
          <SignInModal />
        </>
      );
  };

  return (
    <header>
      <div>That's not a twitter</div>
      <nav></nav>
      <div>{authSectionButtons()}</div>
    </header>
  );
};

export default Header;
