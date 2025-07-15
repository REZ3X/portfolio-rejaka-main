import React, { useState } from "react";
import ExperienceAchievementModal from "@/components/modals/ExperienceAchievementModal";
import XiannyaaExperienceAchievementModal from "@/components/modals/xiannyaa/ExperienceAchievementModal";
import { experienceData } from "@/data/ExperienceData";
import { useUser } from "@/context/UserContext";

const ExperienceAchievement: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { themeStyle } = useUser();

  const latestExperience = experienceData.experience[3];
  const latestAchievement = experienceData.achievements[3];

  if (themeStyle === "terminal") {
    return (
      <>
        <button
          className="font-mono bg-[#060a10] text-[#e0e0e0] rounded-none border border-[#393d46] h-full flex flex-col cursor-pointer hover:border-[#00adb4] transition-colors duration-200"
          onClick={() => setShowModal(true)}
        >
          <div className="p-2.5 border-b border-[#393d46] flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
              <h2 className="text-[#00adb4] font-bold text-base">
                Experience & Achievements
              </h2>
            </div>
            <div className="text-xs text-[#393d46]">
              {experienceData.experience.length +
                experienceData.achievements.length}{" "}
              items
            </div>
          </div>

          <div className="p-3 flex flex-col gap-3 flex-grow">
            <div className="border border-[#393d46] p-3 flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[#00adb4] font-bold text-sm">
                  Important Experience
                </h3>
                <span className="text-xs text-[#393d46]">
                  {latestExperience.period}
                </span>
              </div>
              <div className="text-sm font-semibold mb-1">
                {latestExperience.title}
              </div>
              <div className="text-xs text-[#e0e0e0]">
                {latestExperience.company}
              </div>

              {latestExperience.responsibilities &&
                latestExperience.responsibilities.length > 0 && (
                  <div className="mt-2 text-xs flex items-start">
                    <span className="text-[#188d93] mr-1.5">›</span>
                    <span className="text-[#e0e0e0] opacity-80">
                      {latestExperience.responsibilities[0]}
                    </span>
                  </div>
                )}
            </div>

            <div className="border border-[#393d46] p-3 flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[#00adb4] font-bold text-sm">
                  Biggest Achievement
                </h3>
                <span className="text-xs text-[#393d46]">
                  {latestAchievement.year}
                </span>
              </div>
              <div className="text-sm font-semibold mb-1">
                {latestAchievement.title}
              </div>
              <div className="text-xs text-[#e0e0e0]">
                {latestAchievement.issuer}
              </div>

              {latestAchievement.description && (
                <div className="mt-2 text-xs text-[#e0e0e0] opacity-80 line-clamp-2">
                  {latestAchievement.description}
                </div>
              )}
            </div>
          </div>

          <div className="mt-auto p-1.5 border-t border-[#393d46] text-center">
            <div className="text-xs text-[#00adb4] hover:underline inline-block py-0.5 px-2 cursor-pointer">
              View all experience & achievements
            </div>
          </div>
        </button>

        {showModal && (
          <ExperienceAchievementModal onClose={() => setShowModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <button
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl shadow-md h-full flex flex-col cursor-pointer soft-card overflow-hidden"
        onClick={() => setShowModal(true)}
      >
        <div className="p-4 bg-gradient-to-r from-[#3a1f37] to-[#2c1927] flex items-center justify-between">
          <h2 className="text-[#f4c1d8] font-medium text-lg">Career Journey</h2>
        </div>

        <div className="p-3 flex flex-col gap-3 flex-grow">
          <div className="rounded-xl border border-[#574655] p-4 bg-[#382736] flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#e39fc2] font-medium text-base">
                Important Role
              </h3>
              <span className="text-sm text-[#c4b2c3] px-2 py-0.5 bg-[#463343] rounded-full">
                {latestExperience.period}
              </span>
            </div>
            <div className="text-base text-[#f0e6ef] font-medium mb-1">
              {latestExperience.title}
            </div>
            <div className="text-sm text-[#c4b2c3]">
              {latestExperience.company}
            </div>

            {latestExperience.responsibilities &&
              latestExperience.responsibilities.length > 0 && (
                <div className="mt-3 text-sm text-[#f0e6ef] border-t border-[#574655] pt-2">
                  <div className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span>{latestExperience.responsibilities[0]}</span>
                  </div>
                </div>
              )}
          </div>

          <div className="rounded-xl border border-[#574655] p-4 bg-[#382736] flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[#e39fc2] font-medium text-base">
                Biggest Achievement
              </h3>
              <span className="text-sm text-[#c4b2c3] px-2 py-0.5 bg-[#463343] rounded-full">
                {latestAchievement.year}
              </span>
            </div>
            <div className="text-base text-[#f0e6ef] font-medium mb-1">
              {latestAchievement.title}
            </div>
            <div className="text-sm text-[#c4b2c3]">
              {latestAchievement.issuer}
            </div>

            {latestAchievement.description && (
              <div className="mt-3 text-sm text-[#f0e6ef] border-t border-[#574655] pt-2 line-clamp-2">
                {latestAchievement.description}
              </div>
            )}
          </div>
        </div>

        <div className="mt-auto p-3 border-t border-[#574655] text-center">
          <div className="text-sm text-[#e39fc2] inline-block py-1 px-3 cursor-pointer hover:text-[#f4c1d8] transition-colors">
            View full career timeline
          </div>
        </div>
      </button>

      {showModal &&
        (themeStyle === "soft" ? (
          <XiannyaaExperienceAchievementModal
            onClose={() => setShowModal(false)}
          />
        ) : (
          <ExperienceAchievementModal onClose={() => setShowModal(false)} />
        ))}
    </>
  );
};

export default ExperienceAchievement;
