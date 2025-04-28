import React, { useState, useEffect } from "react";
import ProjectsModal from "@/components/modals/ProjectsModal";
import XiannyaaProjectsModal from "@/components/modals/xiannyaa/ProjectsModal";
import { projectsData } from "@/data/ProjectsData";
import { useUser } from "@/context/UserContext";

interface ProjectCardProps {
  title: string;
  category: string;
  thumbnail?: string;
  color: string;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  color,
  onClick,
}) => {
  const { themeStyle } = useUser();

  return themeStyle === "terminal" ? (
    <button
      className="p-2.5 border border-[#393d46] cursor-pointer hover:border-[#00adb4] transition-colors duration-200 flex flex-col"
      onClick={onClick}
    >
      <div className="mb-1">
        <div
          className="w-full h-1 mb-1"
          style={{ backgroundColor: color }}
        ></div>
        <h3 className="text-[#00adb4] font-bold text-sm truncate">{title}</h3>
        <div className="text-xs text-[#e0e0e0] opacity-75">{category}</div>
      </div>

      <div className="mt-auto text-xs text-right text-[#393d46]">→</div>
    </button>
  ) : (
    <button
      className="p-3 border border-[#5d4a5c] rounded-xl cursor-pointer hover:border-[#e6a2ce] transition-all duration-200 flex flex-col bg-[#3a2939] hover:bg-[#4e3a4d] soft-card group"
      onClick={onClick}
    >
      <div className="mb-2">
        <div
          className="w-1/3 h-1.5 mb-2 rounded-full"
          style={{ backgroundColor: color }}
        ></div>
        <h3 className="text-[#e6a2ce] font-medium text-base truncate group-hover:text-[#f4c6e2] transition-colors">
          {title}
        </h3>
        <div className="text-sm text-[#d5c0d4] mt-1">{category}</div>
      </div>

      <div className="mt-auto text-xs text-right text-[#d5c0d4] group-hover:text-[#e6a2ce] transition-colors">
        View details{" "}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity">
          →
        </span>
      </div>
    </button>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { themeStyle } = useUser();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.openProjectModal = (projectId: string) => {
        setSelectedProject(projectId);
      };
    }

    return () => {
      if (typeof window !== "undefined" && window.openProjectModal) {
        window.openProjectModal = undefined;
      }
    };
  }, []);

  const openProjectModal = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const categoryColors: Record<string, string> = {
    web: themeStyle === "soft" ? "#e39fc2" : "#00adb4",
    mobile: themeStyle === "soft" ? "#b4688f" : "#2e86de",
    book: themeStyle === "soft" ? "#d782b5" : "#8e44ad",
    design: themeStyle === "soft" ? "#c86baa" : "#e84393",
    game: themeStyle === "soft" ? "#e39fc2" : "#e67e22",
    research: themeStyle === "soft" ? "#b4688f" : "#27ae60",
    bot: themeStyle === "soft" ? "#c47fb0" : "#3498db",
  };

  const itemCount = themeStyle === "soft" ? 2 : 4;

  return (
    <>
      <div
        className={`${
          themeStyle === "soft"
            ? "theme-font theme-bg-primary theme-text-primary rounded-2xl shadow-md h-full flex flex-col soft-card"
            : "font-mono bg-[#060a10] text-[#e0e0e0] rounded-none border border-[#393d46] h-full flex flex-col"
        }`}
      >
        <div
          className={`
          flex items-center justify-between
          ${
            themeStyle === "soft"
              ? "p-4 bg-gradient-to-r from-[#3a1f37] to-[#2c1927]"
              : "p-2.5 border-b border-[#393d46]"
          }
        `}
        >
          {themeStyle === "terminal" ? (
            <>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
                <h2 className="text-[#00adb4] font-bold text-base">Projects</h2>
              </div>
              <div className="text-xs text-[#393d46]">
                {projectsData.projects.length} items
              </div>
            </>
          ) : (
            <h2 className="text-[#f4c1d8] font-medium text-lg">
              Latest Projects
            </h2>
          )}
        </div>

        <div
          className={`
          ${
            themeStyle === "soft"
              ? "p-3 grid grid-cols-1 gap-3 flex-grow"
              : "p-2 grid grid-cols-2 gap-2 flex-grow"
          }
        `}
        >
          {projectsData.projects.slice(0, itemCount).map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              thumbnail={project.thumbnail}
              color={categoryColors[project.category] || categoryColors.web}
              onClick={() => openProjectModal(project.id)}
            />
          ))}
        </div>

        <div
          className={`
          ${
            themeStyle === "soft"
              ? "p-3 text-center"
              : "p-0.5 border-t border-[#393d46] text-center"
          }
        `}
        >
          <button
            className={`
              ${
                themeStyle === "soft"
                  ? "px-4 py-1.5 text-sm rounded-full bg-[#3a1f37] text-[#e39fc2] hover:bg-[#463343]"
                  : "text-[8px] text-[#00adb4] hover:underline"
              }
            `}
            onClick={() => openProjectModal("all")}
          >
            {themeStyle === "soft" ? "View all projects" : "View all"}
          </button>
        </div>
      </div>

      {selectedProject &&
        (themeStyle === "soft" ? (
          <XiannyaaProjectsModal
            projectId={selectedProject}
            onClose={closeProjectModal}
          />
        ) : (
          <ProjectsModal
            projectId={selectedProject}
            onClose={closeProjectModal}
          />
        ))}
    </>
  );
};

declare global {
  interface Window {
    openProjectModal?: (projectId: string) => void;
  }
}

export default Projects;
