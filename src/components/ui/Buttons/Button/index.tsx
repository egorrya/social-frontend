import React from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
	children: string;

	onClick?: () => void;
	type?: 'submit';
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	type,
	onClick,
	children,
	disabled = false,
}) => {
	return (
		<button
			disabled={disabled}
			type={type}
			className={styles.button}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
