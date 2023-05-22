import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../../state/auth/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import LogInModal from '../../screens/Modals/LogInModal';
import Button from '../../ui/Buttons/Button';

import { setActiveHomeFilter } from '../../../state/filters/slice';
import RegisterModal from '../../screens/Modals/RegisterModal';
import styles from './Header.module.scss';

const Header: FC = () => {
	const dispatch = useAppDispatch();

	const [initialLoad, setInitialLoad] = useState<boolean>(true);

	const { loggedIn, user } = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		if (initialLoad) setInitialLoad(false);
	}, [initialLoad]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(logOut());
	};

	const authSectionButtons = () => {
		if (!loggedIn)
			return (
				<div className={styles.modalButtons}>
					<LogInModal />
					<RegisterModal />
				</div>
			);

		if (loggedIn)
			return (
				<div>
					<Link className={styles.profileName} to={`/${user?.username}`}>
						{user?.username}
					</Link>
					<Button onClick={handleLogout}>Logout</Button>
				</div>
			);
	};

	return (
		<header className={styles.header}>
			{' '}
			<Link
				className={styles.header__logo}
				to={'/'}
				onClick={() => dispatch(setActiveHomeFilter('all'))}
			>
				Nottwitter
			</Link>
			{authSectionButtons()}
		</header>
	);
};

export default Header;
