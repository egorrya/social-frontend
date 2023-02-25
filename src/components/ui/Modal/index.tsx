import { FC, MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '../../../assets/svg/CloseIcon';
import { disableModal, setActiveModalId } from '../../../state/modal/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import Button from '../Button';

import styles from './Modal.module.scss';

interface ModalProps {
	title: string;
	children: React.ReactNode;
	id: string;
}

const Modal: FC<ModalProps> = ({ title, children, id }) => {
	const dispatch = useAppDispatch();
	const { activeModalId } = useSelector((state: RootState) => state.modal);

	const [showModal, setShowModal] = useState(false);

	const handleClose = (event: MouseEvent) => {
		const target = event.target as HTMLElement | SVGElement;

		if (
			target.className === styles.overlay ||
			target.tagName === 'svg' ||
			target.tagName === 'path'
		) {
			dispatch(disableModal());

			setShowModal(false);
		}
	};

	const handleOpen = () => {
		if (id) dispatch(setActiveModalId(id));

		setShowModal(true);
	};

	return (
		<>
			<Button onClick={handleOpen} text={title} />
			{showModal && activeModalId === id && (
				<div onClick={handleClose} className={styles.overlay}>
					<div className={styles.modal}>
						<div className={styles.modal__header}>
							<h3 className={styles.modal__title}>{title}</h3>

							<CloseIcon
								className={styles.modal__close}
								onClick={handleClose}
							/>
						</div>
						<div className={styles.modal__body}>{children}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
