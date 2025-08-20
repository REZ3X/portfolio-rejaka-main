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
            About Rejaka Abimanyu Susanto
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

        <div
          className={`p-4 border-b ${
            themeStyle === "soft" ? "theme-border" : "border-[#393d46]"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div
              className={`${
                themeStyle === "terminal" ? "text-[#00adb4] text-lg" : ""
              }`}
            >
              <h3
                className={`${
                  themeStyle === "terminal"
                    ? "text-[#00adb4]"
                    : "theme-accent-primary"
                } text-lg font-medium mb-2`}
              >
                Rejaka Abimanyu Susanto | Full Stack Developer
              </h3>
              <p className="text-sm mb-3">
                Welcome to the portfolio of Rejaka Abimanyu Susanto. As a
                dedicated full stack developer based in Indonesia, I combine
                technical expertise with creative problem-solving to deliver
                exceptional digital experiences and web applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {themeStyle === "terminal" ? (
                  <>
                    <span className="px-2 py-0.5 text-xs border border-[#393d46]">
                      Web_Development
                    </span>
                    <span className="px-2 py-0.5 text-xs border border-[#393d46]">
                      Next.js
                    </span>
                    <span className="px-2 py-0.5 text-xs border border-[#393d46]">
                      TypeScript
                    </span>
                  </>
                ) : (
                  <>
                    <span className="px-2 py-0.5 text-xs theme-bg-secondary rounded-full">
                      Web Development
                    </span>
                    <span className="px-2 py-0.5 text-xs theme-bg-secondary rounded-full">
                      Next.js
                    </span>
                    <span className="px-2 py-0.5 text-xs theme-bg-secondary rounded-full">
                      TypeScript
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {aboutData.sections.map((section, index) => (
            <div key={index} className="mb-6">
              <h3
                className={`${
                  themeStyle === "terminal"
                    ? "text-[#00adb4]"
                    : "theme-accent-primary"
                } text-lg mb-2`}
              >
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
                <p
                  className={`text-xs ${
                    themeStyle === "terminal"
                      ? "text-[#00adb4]"
                      : "theme-accent-primary"
                  } mt-1`}
                >
                  — {aboutData.quote.author}
                </p>
              )}
            </div>
          )}

          <div
            className={`mt-8 pt-6 ${
              themeStyle === "soft"
                ? "border-t theme-border"
                : "border-t border-[#393d46]"
            }`}
          >
            <h3
              className={`${
                themeStyle === "terminal"
                  ? "text-[#00adb4]"
                  : "theme-accent-primary"
              } text-lg mb-3`}
            >
              More About Rejaka Abimanyu Susanto
            </h3>

            <p className="text-sm mb-3">
              Rejaka Abimanyu Susanto is a multifaceted professional with
              expertise spanning technical development, creative writing, and
              academic research. Based in Indonesia, Rejaka combines
              analytical thinking with creative problem-solving to develop
              innovative digital solutions and compelling content.
            </p>

            <p className="text-sm mb-3">
              As a dedicated developer and creator, Rejaka Abimanyu Susanto 
              specializes in building modern web applications, developing 
              automation tools, and creating educational content. His portfolio 
              showcases a diverse range of projects spanning web development, 
              mobile applications, and community-focused platforms.
            </p>

            <p className="text-sm">
              Connect with Rejaka Abimanyu Susanto on
              <a
                href="https://github.com/REZ3X"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  themeStyle === "terminal"
                    ? "text-[#00adb4] underline mx-1"
                    : "theme-accent-primary hover:underline mx-1"
                }`}
              >
                GitHub
              </a>
              ,
              <a
                href="https://linkedin.com/in/rejaka-me"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  themeStyle === "terminal"
                    ? "text-[#00adb4] underline mx-1"
                    : "theme-accent-primary hover:underline mx-1"
                }`}
              >
                LinkedIn
              </a>
              , or
              <a
                href="https://instagram.com/rejakasusanto"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  themeStyle === "terminal"
                    ? "text-[#00adb4] underline mx-1"
                    : "theme-accent-primary hover:underline mx-1"
                }`}
              >
                Instagram
              </a>
              to follow his latest projects and professional journey.
            </p>

            <div className="flex justify-center mt-6">
              <span
                className={`px-3 py-1 text-xs ${
                  themeStyle === "terminal"
                    ? "border border-[#393d46]"
                    : "theme-bg-secondary rounded-full"
                }`}
              >
                © {new Date().getFullYear()} Rejaka Abimanyu Susanto - All
                Rights Reserved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;