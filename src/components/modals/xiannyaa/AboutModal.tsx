import React, { useRef } from "react";
import { useUser } from "@/context/UserContext";
import { aboutDataByUser } from "@/data/AboutData";
import ModalWrapper from "./ModalWrapper";

interface AboutModalProps {
  onClose: () => void;
}

const XiannyaaAboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { activeUser } = useUser();
  const aboutData = aboutDataByUser[activeUser];

  return (
    <ModalWrapper onClose={onClose}>
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border border-[#574655] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
        style={{
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 30px rgba(227, 159, 194, 0.15) inset",
          animation: "fadeIn 0.4s ease-out forwards",
        }}
      >
        <div className="sticky top-0 z-10 border-b border-[#574655] bg-gradient-to-r from-[#3a1f37] to-[#2c1927] p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-[#e39fc2] rounded-full mr-3"></div>
            <h2 className="text-[#f4c1d8] text-xl font-medium">
              {aboutData.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
          >
            Close
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(80vh-72px)]">
          <div className="absolute top-16 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e39fc2]">✨</div>
          </div>

          {aboutData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
                <span className="mr-2 text-sm">✦</span>
                {section.title}
                <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
              </h3>
              <div className="space-y-4 pl-5">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[#f0e6ef] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {aboutData.quote && (
            <div className="mt-8 border-l-2 border-[#e39fc2] pl-5 py-3 bg-[#382736]/50 rounded-r-lg">
              <p className="text-[#f0e6ef] italic">{aboutData.quote.text}</p>
              {aboutData.quote.author && (
                <p className="text-[#e39fc2] text-sm mt-2">
                  — {aboutData.quote.author}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#e39fc2] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default XiannyaaAboutModal;
