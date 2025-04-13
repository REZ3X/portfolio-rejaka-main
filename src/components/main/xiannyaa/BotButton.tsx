import React, { useState } from "react";
import XiannyaaVoidBotModal from "@/components/modals/xiannyaa/VoidBotModal";
import BotButtonWrapper from "./BotButtonWrapper";

const XiannyaaBotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BotButtonWrapper>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-full shadow-lg
          bg-[#3a2939] border-2 border-[#e39fc2] hover:bg-[#2a1e29] hover:shadow-xl
          transition-all duration-300 transform hover:-translate-y-1"
        style={{
          boxShadow: "0 4px 12px rgba(227, 159, 194, 0.2)",
        }}
      >
        <div className="flex items-center justify-center">
          <span className="text-2xl text-[#e39fc2]">✨</span>
        </div>
      </button>

      {isOpen && <XiannyaaVoidBotModal onClose={() => setIsOpen(false)} />}
    </BotButtonWrapper>
  );
};

export default XiannyaaBotButton;