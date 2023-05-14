import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { closePopup } from '../../../../state/notificationPopup/slice';
import { RootState, useAppDispatch } from '../../../../state/store';

import TickIcon from '../../../../assets/svg/TickIcon';
import XIcon from '../../../../assets/svg/XIcon';
import styles from './PopupNotification.module.scss';

interface PopupNotificationProps {
	duration?: number; // duration in milliseconds, optional
	onPopupEnd?: () => void; // callback function to execute after the popup disappears, optional
}

const PopupNotification: FC<PopupNotificationProps> = ({
	duration = 6000,
	onPopupEnd,
}) => {
	const dispatch = useAppDispatch();
	const [visible, setVisible] = useState(true);

	const { status, message } = useSelector(
		(state: RootState) => state.notificationPopup
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
			if (onPopupEnd) {
				onPopupEnd();
			} else {
				// Auto close if no onPopupEnd provided
				setVisible(false);
				dispatch(closePopup());
			}
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [dispatch, duration, onPopupEnd]);

	if (!visible) {
		return null;
	}

	return (
		<div className={styles.popup}>
			{status === 'success' ? <TickIcon /> : <XIcon />}
			{message}
		</div>
	);
};

export default PopupNotification;
