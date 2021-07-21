import React from "react";
import { Portal, PortalTarget } from "../PortalFavorites/Portal.component";

import "./Modal.component.css";

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
      <div ref={outsideRef} className={"modalFavorites"} onClick={closeModal}>
        <div className={"modalContentFavorites"}>{children}</div>
      </div>
    </Portal>
  ) : null;
};
