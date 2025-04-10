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

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

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
        backgroundColor: "rgba(33, 20, 33, 0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
      }}
      className="animate-in fade-in duration-300"
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
        className="animate-in zoom-in-95 duration-300"
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalWrapper;