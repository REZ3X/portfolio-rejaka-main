import React, { useRef, useState } from "react";
import { experienceData } from "@/data/ExperienceData";
import ModalWrapper from "./ModalWrapper";

interface ExperienceAchievementModalProps {
  onClose: () => void;
}

const XiannyaaExperienceAchievementModal: React.FC<
  ExperienceAchievementModalProps
> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"experience" | "achievements">(
    "experience"
  );

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
            <div className="flex items-center">
              <span className="text-[#e39fc2] text-xl mr-2">✨</span>
              <h2 className="text-[#f4c1d8] text-xl font-medium">My Journey</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
          >
            Close
          </button>
        </div>

        <div className="sticky top-[73px] z-10 bg-[#2a1e29] border-b border-[#574655] p-3 flex space-x-2">
          <button
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              activeTab === "experience"
                ? "bg-[#e39fc2] text-[#2a1e29] font-medium shadow-md"
                : "bg-[#463343] text-[#e39fc2] hover:bg-[#574655]"
            }`}
            onClick={() => setActiveTab("experience")}
          >
            Career Timeline
          </button>
          <button
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              activeTab === "achievements"
                ? "bg-[#e39fc2] text-[#2a1e29] font-medium shadow-md"
                : "bg-[#463343] text-[#e39fc2] hover:bg-[#574655]"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(80vh-132px)]">
          <div className="absolute top-32 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e39fc2]">✨</div>
          </div>

          {activeTab === "experience" ? (
            <div className="space-y-6">
              <p className="text-[#f0e6ef] leading-relaxed mb-4">
                {experienceData.experienceIntro}
              </p>

              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-0 w-0.5 bg-gradient-to-b from-[#e39fc2] via-[#b4688f] to-transparent"></div>

                {experienceData.experience.map((job, index) => (
                  <div key={index} className="relative pl-12">
                    <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-[#e39fc2] transform -translate-x-1/2 border-2 border-[#2a1e29] shadow-md"></div>

                    <div className="border border-[#574655] rounded-xl p-5 bg-[#382736] shadow-sm">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                        <h3 className="text-[#e39fc2] font-medium text-lg">
                          {job.title}
                        </h3>
                        <span className="text-sm px-3 py-1 bg-[#463343] text-[#c4b2c3] rounded-full mt-2 md:mt-0">
                          {job.period}
                        </span>
                      </div>

                      <div className="mb-3 text-[#f0e6ef]">{job.company}</div>

                      <div className="space-y-2">
                        {job.responsibilities.map((responsibility, i) => (
                          <div key={i} className="flex items-start">
                            <span className="text-[#e39fc2] mr-2 mt-0.5">
                              ✦
                            </span>
                            <span className="text-[#f0e6ef]">
                              {responsibility}
                            </span>
                          </div>
                        ))}
                      </div>

                      {job.technologies && (
                        <div className="mt-4 pt-3 border-t border-[#574655] flex flex-wrap gap-2">
                          {job.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 bg-[#463343] text-[#e39fc2] text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-[#f0e6ef] leading-relaxed mb-4">
                {experienceData.achievementsIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experienceData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="border border-[#574655] rounded-xl p-5 bg-[#382736] transition-all duration-200 hover:bg-[#3a2839] hover:border-[#e39fc2] shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-[#e39fc2] font-medium text-lg">
                        {achievement.title}
                      </h3>
                      <span className="text-sm px-3 py-1 bg-[#463343] text-[#c4b2c3] rounded-full">
                        {achievement.year}
                      </span>
                    </div>

                    <div className="text-[#f0e6ef] mb-3">
                      {achievement.issuer}
                    </div>

                    <div className="pt-3 mt-1 border-t border-[#574655]">
                      <p className="text-[#c4b2c3] leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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

export default XiannyaaExperienceAchievementModal;
