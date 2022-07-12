import React from 'react';
import { createPortal } from 'react-dom';

import Card from './Card';
import './Modal.scss';

//////
const Backdrop = ({ onHideCart }) => (
  <div className="backdrop" onClick={onHideCart}></div>
);

const ModalLayout = ({ children }) => <Card className="modal">{children}</Card>;

const portalElement = document.getElementById('modal-root');

//////
const Modal = ({ children, onHideCart }) => {
  return (
    <>
      {createPortal(<Backdrop onHideCart={onHideCart} />, portalElement)}{' '}
      {createPortal(<ModalLayout>{children}</ModalLayout>, portalElement)}
    </>
  );
};

export default Modal;
