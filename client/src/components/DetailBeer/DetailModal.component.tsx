import React from "react";
import { Portal, PortalTarget } from "../Login/Portal/Portal.component";

import styles from "./DetailModal.component.module.css";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  const outsideRef = React.useRef(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    if (e.target["id"] === "btnFantasma") {
      handleClose()
    }

    if (e.target === outsideRef.current) {
      handleClose();
    }

  };

  return isOpen ? (
    <Portal target={PortalTarget.MODAL}>
      <div ref={outsideRef} className={styles.modal} onClick={closeModal}>
        <div className={styles.modal__content}>{children}</div>
      </div>
    </Portal>
  ) : null;
};
