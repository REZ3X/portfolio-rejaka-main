import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projectsData } from "@/data/ProjectsData";
import { downloadFile, getFileNameFromPath } from "@/utils/downloadUtils";

interface ProjectLink {
  label: string;
  url?: string;
  icon: string;
  downloadPath?: string;
  type?: "url" | "download";
}

interface ProjectsModalProps {
  projectId: string;
  onClose: () => void;
}

const ProjectsModal: React.FC<ProjectsModalProps> = ({
  projectId,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const categoryColors: Record<string, string> = {
    web: "#00adb4",
    mobile: "#2e86de",
    book: "#8e44ad",
    design: "#e84393",
    game: "#e67e22",
    research: "#27ae60",
    bot: "#9b59b6",
  };

  const filteredProjects =
    projectId === "all"
      ? activeTab === "all"
        ? projectsData.projects
        : projectsData.projects.filter(
            (project) => project.category === activeTab
          )
      : projectsData.projects.filter((project) => project.id === projectId);

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

  useEffect(() => {
    if (projectId !== "all") {
      const project = projectsData.projects.find((p) => p.id === projectId);
      if (project) {
        setActiveTab(project.category);
      }
    }
  }, [projectId]);

  const handleClose = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("modal")) {
        url.searchParams.delete("modal");
        window.history.pushState({}, "", url);
      }
      if (url.searchParams.has("project")) {
        url.searchParams.delete("project");
        window.history.pushState({}, "", url);
      }
    }
    onClose();
  };

  const handleProjectClick = (projectIdToOpen: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "projects");
      url.searchParams.set("project", projectIdToOpen);
      window.history.pushState({}, "", url);
      window.openProjectModal?.(projectIdToOpen);
    }
  };

  const handleLinkClick = (link: ProjectLink) => {
    if (link.type === "download" && link.downloadPath) {
      const fileName = getFileNameFromPath(link.downloadPath);
      downloadFile(link.downloadPath, fileName);
    } else if (link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div
        ref={modalRef}
        className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-4xl w-full max-h-[80vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#060a10] z-10 border-b border-[#393d46] flex justify-between items-center p-4">
          <div className="flex items-center">
            <span className="text-[#00adb4] text-xl mr-2">🚀</span>
            <h2 className="text-[#00adb4] text-xl font-bold">
              {projectId === "all"
                ? "Projects Portfolio"
                : filteredProjects[0]?.title}
            </h2>
            {projectId !== "all" && filteredProjects[0] && (
              <span className="ml-3 px-2 py-1 bg-[#202832] text-[#8b9cbe] text-sm border border-[#393d46]">
                {filteredProjects[0].year}
              </span>
            )}
          </div>
          <button
            onClick={handleClose}
            className="px-2 py-1 bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4] text-xs"
          >
            [x] close
          </button>
        </div>

        {projectId === "all" && (
          <div className="sticky top-[61px] bg-[#060a10] z-10 border-b border-[#393d46] p-3 flex flex-wrap gap-2">
            <button
              className={`px-2 py-1 text-xs border ${
                activeTab === "all"
                  ? "bg-[#202832] border-[#00adb4] text-[#00adb4]"
                  : "border-[#393d46] text-[#e0e0e0] hover:border-[#00adb4]"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>

            {Array.from(
              new Set(projectsData.projects.map((p) => p.category))
            ).map((category) => (
              <button
                key={category}
                className={`px-2 py-1 text-xs border ${
                  activeTab === category
                    ? "bg-[#202832] border-[#00adb4] text-[#00adb4]"
                    : "border-[#393d46] text-[#e0e0e0] hover:border-[#00adb4]"
                }`}
                onClick={() => setActiveTab(category)}
                style={{
                  borderColor:
                    activeTab === category
                      ? categoryColors[category] || "#00adb4"
                      : undefined,
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="p-4">
          {projectId !== "all" ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                {filteredProjects[0]?.thumbnail && (
                  <div className="md:w-1/3">
                    <div className="border border-[#393d46] overflow-hidden">
                      <Image
                        src={filteredProjects[0].thumbnail}
                        alt={filteredProjects[0].title}
                        width={300}
                        height={200}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                )}

                <div
                  className={
                    filteredProjects[0]?.thumbnail ? "md:w-2/3" : "w-full"
                  }
                >
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="inline-block px-2 py-0.5 text-xs border"
                        style={{
                          borderColor:
                            categoryColors[filteredProjects[0]?.category] ||
                            "#00adb4",
                          color:
                            categoryColors[filteredProjects[0]?.category] ||
                            "#00adb4",
                        }}
                      >
                        {filteredProjects[0]?.category.toUpperCase()}
                      </div>
                      <div className="px-2 py-0.5 bg-[#202832] text-[#8b9cbe] text-xs border border-[#393d46]">
                        {filteredProjects[0]?.year}
                      </div>
                    </div>
                    <h3 className="text-lg text-[#00adb4] font-bold">
                      {filteredProjects[0]?.title}
                    </h3>
                    <p className="text-sm text-[#e0e0e0] opacity-75">
                      {filteredProjects[0]?.subtitle}
                    </p>
                  </div>

                  {filteredProjects[0]?.links &&
                    filteredProjects[0]?.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {filteredProjects[0].links.map((link, i) => (
                          <button
                            key={i}
                            onClick={() => handleLinkClick(link)}
                            className="text-xs border border-[#393d46] bg-[#202832] px-2 py-1 hover:border-[#00adb4] inline-flex items-center transition-colors"
                          >
                            <span className="mr-1">{link.icon}</span>
                            {link.label}
                          </button>
                        ))}
                      </div>
                    )}

                  <div className="flex flex-wrap gap-1 mb-3">
                    {filteredProjects[0]?.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 bg-[#202832] text-[#e0e0e0] border border-[#393d46] text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[#00adb4] font-bold mb-2">Description</h4>
                  <div className="text-sm space-y-2">
                    {filteredProjects[0]?.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {filteredProjects[0]?.features &&
                  filteredProjects[0]?.features.length > 0 && (
                    <div>
                      <h4 className="text-[#00adb4] font-bold mb-2">
                        Key Features
                      </h4>
                      <ul className="text-sm space-y-1 list-inside">
                        {filteredProjects[0].features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-[#188d93] mr-2">›</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {filteredProjects[0]?.challenges &&
                  filteredProjects[0]?.challenges.length > 0 && (
                    <div>
                      <h4 className="text-[#00adb4] font-bold mb-2">
                        Challenges & Solutions
                      </h4>
                      <div className="space-y-3">
                        {filteredProjects[0].challenges.map((challenge, i) => (
                          <div key={i} className="border border-[#393d46] p-3">
                            <div className="mb-1 font-bold text-sm">
                              Challenge: {challenge.challenge}
                            </div>
                            <div className="text-sm">
                              Solution: {challenge.solution}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-[#393d46] overflow-hidden cursor-pointer hover:border-[#00adb4] transition-colors duration-200"
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.thumbnail ? (
                    <div className="relative h-32">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a10] to-transparent"></div>
                      <div
                        className="absolute top-2 left-2 px-1.5 py-0.5 text-xs"
                        style={{
                          backgroundColor:
                            categoryColors[project.category] || "#00adb4",
                          color: "#ffffff",
                        }}
                      >
                        {project.category}
                      </div>
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#060a10] text-[#8b9cbe] text-xs border border-[#393d46]">
                        {project.year}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-32 flex items-center justify-center relative"
                      style={{
                        backgroundColor: "#0c1219",
                        borderBottom: `1px solid ${
                          categoryColors[project.category] || "#00adb4"
                        }`,
                      }}
                    >
                      <span className="text-3xl">{project.emoji || "🚀"}</span>
                      <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#060a10] text-[#8b9cbe] text-xs border border-[#393d46]">
                        {project.year}
                      </div>
                    </div>
                  )}

                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-[#00adb4] font-bold truncate flex-1">
                        {project.title}
                      </h3>
                      <span className="text-xs text-[#8b9cbe] ml-2 font-mono">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-xs text-[#e0e0e0] opacity-75 line-clamp-2 mb-2">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-1 py-0.5 bg-[#202832] text-[#e0e0e0] border border-[#393d46] text-[10px]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-[#393d46]">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsModal;