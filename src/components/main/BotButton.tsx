import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import VoidBotModal from "@/components/modals/VoidBotModal";
import XiannyaaBotButton from "@/components/main/xiannyaa/BotButton";

const BotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeStyle } = useUser();

  if (themeStyle === "soft") {
    return <XiannyaaBotButton />;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-6 p-3 rounded-full shadow-lg z-40
          bg-[#0c1219] border-2 border-[#00adb4] hover:bg-[#112130]"
      >
        <div className="flex items-center justify-center">
          <span className="text-2xl text-[#00adb4]">🤖</span>
        </div>
      </button>

      {isOpen && <VoidBotModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default BotButton;