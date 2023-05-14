import { FC } from 'react';
import Header from '../../shared/Header';
import BackToTop from '../../ui/Buttons/BackToTop';

import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';
import PopupNotification from '../../screens/Modals/PopupNotification';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
	const { isOpen } = useSelector((state: RootState) => state.notificationPopup);

	return (
		<>
			<Header />
			<main className={styles.mainWrapper}>{children}</main>
			{isOpen && <PopupNotification />}
			<BackToTop />
		</>
	);
};

export default PageLayout;
