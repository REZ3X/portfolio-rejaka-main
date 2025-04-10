import React, { useRef } from "react";
import { useUser } from "@/context/UserContext";
import { aboutDataByUser } from "@/data/AboutData";
import ModalWrapper from "./ModalWrapper";
import ModalHeader from "./ModalHeader";
import { AboutIcon } from "./IconSet";

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
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border border-[#5d4a5c] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
        style={{
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 30px rgba(230, 162, 206, 0.2) inset",
          animation: "fadeIn 0.4s ease-out forwards",
        }}
      >
        <ModalHeader
          title={aboutData.name}
          Icon={AboutIcon}
          onClose={onClose}
        />

        <div className="p-6 overflow-auto max-h-[calc(80vh-72px)]">
          <div className="absolute top-16 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e6a2ce]">✨</div>
          </div>

          {aboutData.sections.map((section, index) => (
            <div
              key={index}
              className="mb-8 animate-in slide-in-from-bottom-3 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-[#e6a2ce] text-lg font-medium mb-4 flex items-center">
                <span className="mr-2 text-sm">✦</span>
                {section.title}
                <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#5d4a5c] to-transparent"></div>
              </h3>
              <div className="space-y-4 pl-5">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[#f5eaf4] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {aboutData.quote && (
            <div className="mt-8 border-l-2 border-[#e6a2ce] pl-5 py-3 bg-[#3a2939]/50 rounded-r-lg shadow-inner">
              <p className="text-[#f5eaf4] italic">{aboutData.quote.text}</p>
              {aboutData.quote.author && (
                <p className="text-[#e6a2ce] text-sm mt-2 font-medium">
                  — {aboutData.quote.author}
                </p>
              )}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#e6a2ce] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default XiannyaaAboutModal;
