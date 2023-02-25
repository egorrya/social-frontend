import { FC } from 'react';
import Header from '../../shared/Header';

import styles from './PageLayout.module.scss';

interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
	return (
		<>
			<Header />
			<main className={styles.mainWrapper}>{children}</main>
		</>
	);
};

export default PageLayout;
