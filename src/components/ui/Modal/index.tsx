import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { setActiveModalId } from '../../../state/modal/slice';
import { RootState, useAppDispatch } from '../../../state/store';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

const Modal: FC<ModalProps> = ({ title, children, id }) => {
  const dispatch = useAppDispatch();
  const { activeModalId } = useSelector((state: RootState) => state.modal);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    dispatch(setActiveModalId(''));

    setShowModal(false);
  };

  const handleOpen = () => {
    if (id) dispatch(setActiveModalId(id));

    setShowModal(true);
  };

  return (
    <>
      <button onClick={handleOpen}>{title}</button>
      {showModal && activeModalId === id && (
        <div className='modal'>
          <div className='modal-header'>
            <h2>{title}</h2>
            <button onClick={handleClose}>Close</button>
          </div>
          <div className='modal-body'>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
