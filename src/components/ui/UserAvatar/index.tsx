import { FC } from 'react';

import styles from './UserAvatar.module.scss';

interface UserAvatarProps {
	username: string;
	imageSrc?: string;
	size?: 'small' | 'medium' | 'large';
}

const UserAvatar: FC<UserAvatarProps> = ({
	size = 'small',
	username,
	imageSrc,
}) => {
	return (
		<div className={`${styles.avatar} ${styles[`avatar--${size}`]}`}>
			{imageSrc ? (
				<img src={imageSrc} alt='avatar' />
			) : (
				<div
					className={`${styles['avatar__initials']} ${
						styles[`avatar__initials--${size}`]
					}`}
				>
					{username.split('')[0]}
				</div>
			)}
		</div>
	);
};

export default UserAvatar;
