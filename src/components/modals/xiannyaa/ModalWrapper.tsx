import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalWrapperProps {
  children: ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(3px)",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          margin: "auto",
          position: "relative",
          zIndex: 10000,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalWrapper;
