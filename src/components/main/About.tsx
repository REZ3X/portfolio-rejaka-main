import React, { useState } from "react";
import AboutModal from "@/components/modals/AboutModal";
import XiannyaaAboutModal from "@/components/modals/xiannyaa/AboutModal";
import { useUser } from "@/context/UserContext";
import { aboutDataByUser } from "@/data/AboutData";

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeUser, themeStyle } = useUser();

  const { title, subtitle, tags } = aboutDataByUser[activeUser];

  if (themeStyle === "terminal") {
    return (
      <>
        <button
          className="font-mono theme-bg-primary theme-text-primary p-4 rounded-none border theme-border h-full flex flex-col cursor-pointer hover:border-[#00adb4] transition-colors duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="mb-3 flex items-center">
                <div className="w-3 h-3 theme-accent-bg-primary mr-2"></div>
                <h2 className="theme-accent-primary text-xl font-bold">
                  {title}
                </h2>
              </div>

              <p className="text-sm theme-text-primary mb-4">{subtitle}</p>

              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-[#202832] theme-accent-primary border theme-border text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-2 border-t theme-border text-xs theme-text-secondary">
              Click to learn more about me...
            </div>
          </div>
        </button>

        {isModalOpen && <AboutModal onClose={() => setIsModalOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        className="theme-bg-primary theme-text-primary p-5 rounded-2xl shadow-md h-full flex flex-col cursor-pointer transition-all duration-300 soft-card w-full text-left"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-4">
              <h2 className="theme-accent-primary text-lg font-medium mb-2">
                {title}
              </h2>
              <p className="text-sm theme-text-primary mb-4">{subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 bg-[#463343] text-[#e39fc2] text-xs rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-3 text-sm text-[#c4b2c3] text-center">
            Click to read more about me...
          </div>
        </div>
      </button>

      {isModalOpen && (
        <XiannyaaAboutModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default About;
