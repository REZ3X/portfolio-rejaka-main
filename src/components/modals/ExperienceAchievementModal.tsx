import React, { useEffect, useRef, useState } from "react";
import { experienceData } from "@/data/ExperienceData";

interface ExperienceAchievementModalProps {
  onClose: () => void;
}

const ExperienceAchievementModal: React.FC<ExperienceAchievementModalProps> = ({
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"experience" | "achievements">(
    "experience"
  );

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
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-2xl w-full max-h-[80vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#060a10] z-10 border-b border-[#393d46] flex justify-between items-center p-3">
          <div className="flex items-center">
            <span className="text-[#00adb4] text-lg mr-2">📋</span>
            <h2 className="text-[#00adb4] text-lg font-bold">
              Professional History
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4] text-xs"
          >
            [x] close
          </button>
        </div>

        <div className="border-b border-[#393d46] flex">
          <button
            className={`px-4 py-2 text-sm ${
              activeTab === "experience"
                ? "bg-[#202832] text-[#00adb4] border-b-2 border-[#00adb4]"
                : "text-[#e0e0e0] hover:bg-[#0c1219]"
            }`}
            onClick={() => setActiveTab("experience")}
          >
            Work Experience
          </button>
          <button
            className={`px-4 py-2 text-sm ${
              activeTab === "achievements"
                ? "bg-[#202832] text-[#00adb4] border-b-2 border-[#00adb4]"
                : "text-[#e0e0e0] hover:bg-[#0c1219]"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            Achievements
          </button>
        </div>

        <div className="p-4">
          {activeTab === "experience" ? (
            <div className="space-y-4">
              <p className="text-sm mb-4">{experienceData.experienceIntro}</p>

              <div className="space-y-6 relative">
                <div className="absolute left-4 top-1 bottom-6 w-0.5 bg-[#393d46]"></div>

                {experienceData.experience.map((job, index) => (
                  <div key={index} className="relative pl-10">
                    <div className="absolute left-4 top-1.5 w-3 h-3 rounded-full bg-[#00adb4] transform -translate-x-1/2 border-2 border-[#060a10]"></div>

                    <div className="border border-[#393d46] p-3">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                        <h3 className="text-[#00adb4] font-bold">
                          {job.title}
                        </h3>
                        <span className="text-xs text-[#393d46]">
                          {job.period}
                        </span>
                      </div>

                      <div className="mb-2 text-sm">{job.company}</div>

                      <ul className="text-sm space-y-1">
                        {job.responsibilities.map((responsibility, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-[#188d93] mr-2">›</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>

                      {job.technologies && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {job.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 bg-[#202832] text-[#e0e0e0] border border-[#393d46] text-xs"
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
            <div className="space-y-4">
              <p className="text-sm mb-4">{experienceData.achievementsIntro}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experienceData.achievements.map((achievement, index) => (
                  <div key={index} className="border border-[#393d46] p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[#00adb4] font-bold">
                        {achievement.title}
                      </h3>
                      <span className="text-xs text-[#393d46] ml-2">
                        {achievement.year}
                      </span>
                    </div>

                    <div className="text-sm mb-2">{achievement.issuer}</div>

                    <p className="text-sm text-[#e0e0e0] opacity-80">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceAchievementModal;
