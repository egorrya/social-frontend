import { FC, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '../../../assets/svg/XIcon';
import { disableModal, setActiveModalId } from '../../../state/modal/slice';
import { RootState, useAppDispatch } from '../../../state/store';
import Button from '../Buttons/Button';

import styles from './Modal.module.scss';

interface ModalProps {
	title: string;
	children: React.ReactNode;
	id: string;
}

const Modal: FC<ModalProps> = ({ title, children, id }) => {
	const dispatch = useAppDispatch();
	const { activeModalId, showModal } = useSelector(
		(state: RootState) => state.modal
	);

	const handleClose = (event: MouseEvent) => {
		const target = event.target as HTMLElement | SVGElement;

		if (
			target.className === styles.overlay ||
			target.tagName === 'svg' ||
			target.tagName === 'path' ||
			target.tagName === 'circle' ||
			target.tagName === 'rect' ||
			target.tagName === 'polygon'
		) {
			dispatch(disableModal());
		}
	};

	const handleOpen = () => {
		if (id) dispatch(setActiveModalId(id));
	};

	return (
		<>
			<Button onClick={handleOpen}>{title}</Button>

			{showModal && activeModalId === id && (
				<div onClick={handleClose} className={styles.overlay}>
					<div className={styles.modal}>
						<div className={styles.modal__header}>
							<h3 className={styles.modal__title}>{title}</h3>

							<div onClick={handleClose}>
								<CloseIcon className={styles.modal__close} />
							</div>
						</div>
						<div className={styles.modal__body}>{children}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
