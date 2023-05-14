import { FC } from 'react';

import styles from './EmptyCard.module.scss';

interface EmptyCardProps {
	border?: boolean;
	gradient?: boolean;
	children?: React.ReactNode;

	emoji?: string;
}

const EmptyCard: FC<EmptyCardProps> = ({
	border = true,
	gradient = true,
	children,
	emoji = '',
}) => {
	return (
		<div
			className={`${styles.emptyCard} ${gradient && styles.gradient}  ${
				gradient && styles.border
			}`}
		>
			{emoji && <div className={styles.emoji}>{emoji}</div>}
			{children}
		</div>
	);
};

export default EmptyCard;
