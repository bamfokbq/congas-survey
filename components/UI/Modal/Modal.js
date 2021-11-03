import Portal from '../../HOC/Portal';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div onClick={props.onClose} className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      <Portal>
        <Backdrop onClose={props.onCloseModal} />
      </Portal>
      <Portal>
        <ModalOverlay>{props.children}</ModalOverlay>
      </Portal>
    </>
  );
};

export default Modal;
