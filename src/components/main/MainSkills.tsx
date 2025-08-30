import React, { useState } from "react";
import ProgrammerModal from "@/components/modals/ProgrammerModal";
import AcademicModal from "@/components/modals/AcademicModal";
// import CreativeModal from "@/components/modals/CreativeModal";
import XiannyaaProgrammerModal from "@/components/modals/xiannyaa/ProgrammerModal";
import XiannyaaAcademicModal from "@/components/modals/xiannyaa/AcademicModal";
// import XiannyaaCreativeModal from "@/components/modals/xiannyaa/CreativeModal";
import { useUser } from "@/context/UserContext";

interface SkillCardProps {
  title: string;
  subtitle: string;
  icon: string;
  softIcon?: string;
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  subtitle,
  icon,
  softIcon,
  onClick,
}) => {
  const { themeStyle } = useUser();

  const displayIcon = themeStyle === "soft" && softIcon ? softIcon : icon;

  if (themeStyle === "terminal") {
    return (
      <button
        className="w-full pl-8 pr-4 py-4 cursor-pointer hover:bg-[#0c1219] transition-colors duration-200 h-full flex flex-col relative"
        onClick={onClick}
      >
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-[#0c1219] border-r border-[#393d46] flex items-center justify-center">
          <div
            className="vertical-text font-bold text-xs sm:text-sm tracking-wider uppercase text-[#00adb4] truncate max-h-full"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.05em",
              maxHeight: "calc(100% - 16px)",
              padding: "8px 0",
              overflow: "hidden",
            }}
          >
            {title}
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="text-[#00adb4] text-2xl mr-0.5">{displayIcon}</div>
          <div>
            <h3 className="font-bold text-base text-[#00adb4]">
              {subtitle}
            </h3>
          </div>
        </div>

        <div className="mt-auto text-xs text-[#393d46] pt-3 border-t border-[#393d46] text-right pr-1">
          Click to explore details
        </div>
      </button>
    );
  }

  return (
    <button
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 h-full w-full flex flex-col relative bg-[#3a2939] hover:bg-[#4e3a4d] border border-transparent hover:border-[#e6a2ce]/20 ${themeStyle === "soft" ? "mb-2 md:mb-0 shadow-sm" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center mb-3">
        <div className="mr-3 p-2 bg-[#2e1e2e] rounded-full shadow-md flex items-center justify-center w-12 h-12">
          <span className="text-2xl">{displayIcon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg text-[#e6a2ce]">
            {subtitle}
          </h3>
          <div className="text-sm text-[#d5c0d4] uppercase tracking-wide">
            {title}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-3 border-t border-[#5d4a5c] text-sm text-[#d5c0d4] text-center">
        <span className="flex items-center justify-center">
          <span className="mr-2 text-[#e6a2ce]">✧</span>
          Tap to learn more
        </span>
      </div>
    </button>
  );
};

const MainSkills: React.FC = () => {
  const [activeModal, setActiveModal] = useState<
    "programmer" | "academic" | null
  >(null);

  const { themeStyle } = useUser();

  const openModal = (modal: "programmer" | "academic") => {
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div
        className={`theme-font theme-bg-primary theme-text-primary h-full flex flex-col ${
          themeStyle === "soft"
            ? "rounded-2xl shadow-md overflow-hidden soft-card"
            : "rounded-none border theme-border"
        }`}
      >
        <div
          className={`flex items-center ${
            themeStyle === "soft"
              ? "p-4 bg-gradient-to-r from-[#3a1f37] to-[#2c1927]"
              : "p-2.5 border-b theme-border"
          }`}
        >
          {themeStyle === "terminal" ? (
            <>
              <div className="w-1.5 h-1.5 theme-accent-bg-primary mr-1.5"></div>
              <h2 className="theme-accent-primary font-bold text-base">
                Skills
              </h2>
            </>
          ) : (
            <h2 className="text-[#f4c1d8] font-medium text-lg">
              My Skills & Interests
            </h2>
          )}
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 h-full ${
            themeStyle === "soft"
              ? "gap-3 p-4"
              : ""
          }`}
        >
          <div className={`relative h-full`}>
            <SkillCard
              title="Academic"
              subtitle="Student"
              icon="🎓"
              softIcon="✨"
              onClick={() => openModal("academic")}
            />
            {themeStyle === "terminal" && (
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-px theme-border pointer-events-none"></div>
            )}
          </div>

          <div
            className={`relative h-full ${
              themeStyle === "soft" ? "" : "border-t md:border-t-0 theme-border"
            }`}
          >
            <SkillCard
              title="Programming"
              subtitle="Web Dev"
              icon="💻"
              softIcon="🌸"
              onClick={() => openModal("programmer")}
            />
          </div>
        </div>
      </div>

      {activeModal === "programmer" &&
        (themeStyle === "soft" ? (
          <XiannyaaProgrammerModal onClose={closeModal} />
        ) : (
          <ProgrammerModal onClose={closeModal} />
        ))}

      {activeModal === "academic" &&
        (themeStyle === "soft" ? (
          <XiannyaaAcademicModal onClose={closeModal} />
        ) : (
          <AcademicModal onClose={closeModal} />
        ))}
    </>
  );
};

export default MainSkills;