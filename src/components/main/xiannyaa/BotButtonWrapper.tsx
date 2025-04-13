import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface BotButtonWrapperProps {
  children: ReactNode;
}

const BotButtonWrapper: React.FC<BotButtonWrapperProps> = ({ children }) => {
  return createPortal(
    <div className="fixed bottom-0 right-0 z-[9999] p-6 pointer-events-none">
      <div className="pointer-events-auto">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default BotButtonWrapper;