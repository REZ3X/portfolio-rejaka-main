import React, { useState } from "react";
import ProgrammerModal from "@/components/modals/ProgrammerModal";
import AcademicModal from "@/components/modals/AcademicModal";
import CreativeModal from "@/components/modals/CreativeModal";
import XiannyaaProgrammerModal from "@/components/modals/xiannyaa/ProgrammerModal";
import XiannyaaAcademicModal from "@/components/modals/xiannyaa/AcademicModal";
import XiannyaaCreativeModal from "@/components/modals/xiannyaa/CreativeModal";
import { useUser } from "@/context/UserContext";
import { usersData } from "@/data/UsersData";

interface SkillCardProps {
  title: string;
  subtitle: string;
  icon: string;
  softIcon?: string;
  onClick: () => void;
  isHighlighted?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  subtitle,
  icon,
  softIcon,
  onClick,
  isHighlighted = false,
}) => {
  const { themeStyle } = useUser();

  const displayIcon = themeStyle === "soft" && softIcon ? softIcon : icon;

  if (themeStyle === "terminal") {
    return (
      <button
        className={`w-full pl-8 pr-4 py-4 cursor-pointer hover:bg-[#0c1219] transition-colors duration-200 h-full flex flex-col relative ${
          isHighlighted ? "border-l-2 border-l-[#00adb4] bg-[#0a1520]" : ""
        }`}
        onClick={onClick}
      >
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 ${
            isHighlighted ? "bg-[#081118]" : "bg-[#0c1219]"
          } border-r border-[#393d46] flex items-center justify-center`}
        >
          <div
            className={`vertical-text font-bold text-sm tracking-wider uppercase ${
              isHighlighted ? "text-[#00d6e0]" : "text-[#00adb4]"
            }`}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.1em",
            }}
          >
            {title}
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="text-[#00adb4] text-2xl mr-0.5">{displayIcon}</div>
          <div>
            <h3
              className={`font-bold text-base ${
                isHighlighted ? "text-[#00d6e0]" : "text-[#00adb4]"
              }`}
            >
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
      className={`w-full h-full p-4 cursor-pointer transition-colors duration-200 flex flex-col relative rounded-xl overflow-hidden ${
        isHighlighted
          ? "bg-gradient-to-br from-[#3a1f37] to-[#2a1526] border border-[#e39fc2]/30 shadow-md"
          : "bg-[#382736] hover:bg-[#3a2839] border border-transparent hover:border-[#e39fc2]/20"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-3">
        <div className="text-xl mr-2">{displayIcon}</div>
        <div>
          <h3
            className={`font-medium text-base ${
              isHighlighted ? "text-[#f4c1d8]" : "text-[#e39fc2]"
            }`}
          >
            {subtitle}
          </h3>
          <div className="text-xs text-[#c4b2c3] uppercase tracking-wide">
            {title}
          </div>
        </div>
      </div>

      {isHighlighted && (
        <div className="my-2">
          <div className="h-0.5 w-16 bg-gradient-to-r from-[#e39fc2] to-transparent rounded-full"></div>
        </div>
      )}

      <div className="mt-auto pt-2 border-t border-[#4d3a4c] text-xs text-[#c4b2c3] text-center">
        {isHighlighted ? (
          <span className="text-[#f4c1d8]">• Your specialty •</span>
        ) : (
          <span>Tap to learn more</span>
        )}
      </div>
    </button>
  );
};

const MainSkills: React.FC = () => {
  const [activeModal, setActiveModal] = useState<
    "programmer" | "academic" | "creative" | null
  >(null);

  const { activeUser, themeStyle } = useUser();
  const userFocus = usersData[activeUser].focus;

  const openModal = (modal: "programmer" | "academic" | "creative") => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          <div
            className={`relative h-full ${
              themeStyle === "soft" ? "p-1.5" : ""
            }`}
          >
            <SkillCard
              title="Academic"
              subtitle="Student"
              icon="🎓"
              softIcon="✨"
              onClick={() => openModal("academic")}
              isHighlighted={userFocus === "academic"}
            />
            {themeStyle === "terminal" && (
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-px theme-border pointer-events-none"></div>
            )}
          </div>

          <div
            className={`relative h-full ${
              themeStyle === "soft"
                ? "p-1.5"
                : "border-t md:border-t-0 theme-border"
            }`}
          >
            <SkillCard
              title="Programming"
              subtitle="Web Dev"
              icon="💻"
              softIcon="🌸"
              onClick={() => openModal("programmer")}
              isHighlighted={userFocus === "programmer"}
            />
            {themeStyle === "terminal" && (
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-px theme-border pointer-events-none"></div>
            )}
          </div>

          <div
            className={`relative h-full ${
              themeStyle === "soft"
                ? "p-1.5"
                : "border-t md:border-t-0 theme-border"
            }`}
          >
            <SkillCard
              title="Creative"
              subtitle="Author"
              icon="✒️"
              softIcon="💕"
              onClick={() => openModal("creative")}
              isHighlighted={userFocus === "creative"}
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

      {activeModal === "creative" &&
        (themeStyle === "soft" ? (
          <XiannyaaCreativeModal onClose={closeModal} />
        ) : (
          <CreativeModal onClose={closeModal} />
        ))}
    </>
  );
};

export default MainSkills;
