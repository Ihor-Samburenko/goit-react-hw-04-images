import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import css from '..//Modal/Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  useEffect(() => {
    document.body.addEventListener('keydown', handleClose);
    return () => {
      document.body.removeEventListener('keydown', handleClose);
    };
  });

  const handleClose = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  return createPortal(
    <div onClick={handleClose} className={css.overlay}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     document.body.addEventListener('keydown', this.handleClose);
//   }

//   componentWillUnmount() {
//     document.body.removeEventListener('keydown', this.handleClose);
//   }

//   handleClose = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.close();
//     }
//   };

//   render() {
//     const { children } = this.props;

//     return createPortal(
//       <div onClick={this.handleClose} className={css.overlay}>
//         <div className={css.modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
