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
          title="About Rejaka Abimanyu Susanto"
          Icon={AboutIcon}
          onClose={onClose}
        />

        <div className="p-6 overflow-auto max-h-[calc(80vh-72px)]">
          <div className="absolute top-16 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e6a2ce]">✨</div>
          </div>

          <div className="mb-8 animate-in slide-in-from-bottom-3 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e6a2ce] shadow-lg">
                <div className="w-full h-full bg-[#3a2939] flex items-center justify-center">
                  <span className="text-[#e6a2ce] text-2xl">RA</span>
                </div>
              </div>
              <div>
                <h3 className="text-[#e6a2ce] text-lg font-medium">
                  Rejaka Abimanyu Susanto
                </h3>
                <p className="text-sm text-[#f5eaf4] opacity-80">
                  {activeUser === "rez3x"
                    ? "Full Stack Developer"
                    : activeUser === "abim"
                    ? "Academic Researcher"
                    : "Creative Author"}
                </p>
              </div>
            </div>
            <p className="text-[#f5eaf4] leading-relaxed mb-4">
              Welcome to the portfolio of Rejaka Abimanyu Susanto. As a
              passionate technology professional based in Indonesia, I combine
              technical expertise with creative problem-solving to deliver
              exceptional digital experiences.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 text-xs bg-[#3a2939] text-[#e6a2ce] rounded-full">
                Web Development
              </span>
              <span className="px-3 py-1 text-xs bg-[#3a2939] text-[#e6a2ce] rounded-full">
                Next.js
              </span>
              <span className="px-3 py-1 text-xs bg-[#3a2939] text-[#e6a2ce] rounded-full">
                TypeScript
              </span>
            </div>
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#5d4a5c] to-transparent"></div>
          </div>

          {aboutData.sections.map((section, index) => (
            <div
              key={index}
              className="mb-8 animate-in slide-in-from-bottom-3 duration-500"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
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

          <div
            className="mt-10 pt-6 border-t border-[#5d4a5c] animate-in slide-in-from-bottom-3 duration-500"
            style={{ animationDelay: "500ms" }}
          >
            <h3 className="text-[#e6a2ce] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              More About Rejaka Abimanyu Susanto
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#5d4a5c] to-transparent"></div>
            </h3>

            <div className="space-y-4 pl-5">
              <p className="text-[#f5eaf4] leading-relaxed">
                Rejaka Abimanyu Susanto is a multifaceted professional with
                expertise spanning technical development, creative writing, and
                academic research. Based in Indonesia, Rejaka combines
                analytical thinking with creative problem-solving to develop
                innovative digital solutions and compelling content.
              </p>

              <p className="text-[#f5eaf4] leading-relaxed">
                As the creator of{" "}
                <a
                  href="https://rejaka.me"
                  className="text-[#e6a2ce] hover:underline"
                >
                  rejaka.me
                </a>
                , Rejaka Abimanyu Susanto showcases a portfolio of web
                development projects, including
                <a
                  href="https://idea.rejaka.me"
                  className="text-[#e6a2ce] hover:underline ml-1"
                >
                  idea.rejaka.me
                </a>{" "}
                and
                <a
                  href="https://tasistemporary.rejaka.me"
                  className="text-[#e6a2ce] hover:underline ml-1"
                >
                  tasistemporary.rejaka.me
                </a>
                .
              </p>

              <p className="text-[#f5eaf4] leading-relaxed">
                Connect with Rejaka Abimanyu Susanto on
                <a
                  href="https://github.com/REZ3X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e6a2ce] hover:underline mx-1"
                >
                  GitHub
                </a>
                ,
                <a
                  href="https://linkedin.com/in/rejaka-me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e6a2ce] hover:underline mx-1"
                >
                  LinkedIn
                </a>
                , or
                <a
                  href="https://instagram.com/rejakasusanto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e6a2ce] hover:underline mx-1"
                >
                  Instagram
                </a>
                to follow his latest projects and professional journey.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="px-4 py-2 text-xs text-[#e6a2ce] bg-[#3a2939]/50 rounded-full">
              © {new Date().getFullYear()} Rejaka Abimanyu Susanto - All Rights
              Reserved
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default XiannyaaAboutModal;
