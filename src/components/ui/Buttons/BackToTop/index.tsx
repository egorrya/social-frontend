import React, { useEffect, useState } from 'react';
import UpIcon from '../../../../assets/svg/UpIcon';

import styles from './BackToTop.module.scss';

interface BackToTopProps {
	showAfterScroll?: number;
}

const BackToTop: React.FC<BackToTopProps> = ({ showAfterScroll = 200 }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.pageYOffset > showAfterScroll) {
				setVisible(true);
			} else {
				setVisible(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [showAfterScroll]);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<button
			className={`${styles.backToTop} ${visible ? styles.visible : ''}`}
			onClick={scrollToTop}
			aria-label='Back to top'
		>
			<UpIcon />
		</button>
	);
};

export default BackToTop;
