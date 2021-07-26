import React from "react";
import { Portal, PortalTarget } from "../PortalFavorites/Portal.component";

import styles from "./Modal.component.module.css";

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const ModalFavorites: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  children,
}) => {
  const outsideRef = React.useRef(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === outsideRef.current) {
      handleClose();
    }
  };

  return isOpen ? (
    <Portal target={PortalTarget.MODAL}>
      <div ref={outsideRef} className={styles.modalFavorites} onClick={closeModal}>
        <div className={styles.modalContentFavorites}>{children}</div>
      </div>
    </Portal>
  ) : null;
};
