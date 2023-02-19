import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../../state/auth/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import { Status } from '../../../types/fetchStatus';
import LogInModal from '../../screens/LogInModal';
import SignInModal from '../../screens/RegisterModal';

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

		if (loggedIn)
			return (
				<>
					<Link to={`/${user?.username}`}>{user?.username}</Link>
					<button onClick={handleLogout}>Logout</button>
				</>
			);

		if (!loggedIn)
			return (
				<>
					<LogInModal />
					<SignInModal />
					{status === Status.ERROR && <div>Error</div>}
				</>
			);
	};

	return (
		<header>
			<Link to={'/'}>Nottwitter</Link>
			<nav></nav>
			<div>{authSectionButtons()}</div>
		</header>
	);
};

export default Header;
