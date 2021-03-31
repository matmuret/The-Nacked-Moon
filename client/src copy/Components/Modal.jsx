import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./modalContext";

const Modal = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <div className="modalContainer">
        <img  src={modalContent} onClick={() => handleModal()} />
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
