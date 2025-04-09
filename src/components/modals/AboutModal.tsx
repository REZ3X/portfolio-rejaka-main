import React, { useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { aboutDataByUser } from "@/data/AboutData";

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { activeUser, themeStyle } = useUser();
  const aboutData = aboutDataByUser[activeUser];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutsideClick);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className={`${
          themeStyle === "soft"
            ? "theme-font theme-bg-primary theme-text-primary rounded-2xl border theme-border max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg"
            : "font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-2xl w-full max-h-[80vh] overflow-auto"
        }`}
      >
        <div
          className={`sticky top-0 z-10 border-b theme-border flex justify-between items-center p-4 ${
            themeStyle === "soft" ? "theme-bg-primary" : "bg-[#060a10]"
          }`}
        >
          <h2 className="theme-accent-primary text-xl font-bold">
            {aboutData.name}
          </h2>
          <button
            onClick={onClose}
            className={`px-2 py-1 text-xs ${
              themeStyle === "soft"
                ? "bg-[#463343] theme-text-primary border theme-border hover:bg-[#574655] rounded-lg"
                : "bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4]"
            }`}
          >
            {themeStyle === "soft" ? "Close" : "[x] close"}
          </button>
        </div>

        <div className="p-4">
          {aboutData.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="theme-accent-primary text-lg mb-2">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-sm leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {aboutData.quote && (
            <div
              className={`mt-6 ${
                themeStyle === "soft"
                  ? "border-l-2 border-[#e39fc2] pl-4 italic"
                  : "border-l-2 border-[#00adb4] pl-4 italic"
              }`}
            >
              <p className="text-sm theme-text-primary">
                {aboutData.quote.text}
              </p>
              {aboutData.quote.author && (
                <p className="text-xs theme-accent-primary mt-1">
                  — {aboutData.quote.author}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
