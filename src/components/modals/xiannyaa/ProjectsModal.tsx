import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projectsData } from "@/data/ProjectsData";
import ModalWrapper from "./ModalWrapper";
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

const XiannyaaProjectsModal: React.FC<ProjectsModalProps> = ({
  projectId,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const categoryColors: Record<string, string> = {
    web: "#e39fc2",
    mobile: "#b4688f",
    book: "#d782b5",
    design: "#c86baa",
    game: "#e39fc2",
    research: "#b4688f",
    bot: "#d782b5",
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
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <ModalWrapper onClose={handleClose}>
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border border-[#574655] max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-xl"
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
              <h2 className="text-[#f4c1d8] text-xl font-medium">
                {projectId === "all"
                  ? "My Projects Gallery"
                  : filteredProjects[0]?.title}
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
          >
            Close
          </button>
        </div>

        {projectId === "all" && (
          <div className="sticky top-[73px] bg-[#2a1e29] z-10 border-b border-[#574655] p-4 flex flex-wrap gap-2">
            <button
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                activeTab === "all"
                  ? "bg-[#e39fc2] text-[#2a1e29] font-medium shadow-md"
                  : "bg-[#463343] text-[#e39fc2] hover:bg-[#574655]"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Projects
            </button>

            {Array.from(
              new Set(projectsData.projects.map((p) => p.category))
            ).map((category) => (
              <button
                key={category}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  activeTab === category
                    ? "font-medium shadow-md"
                    : "bg-[#463343] text-[#e39fc2] hover:bg-[#574655]"
                }`}
                style={{
                  backgroundColor:
                    activeTab === category
                      ? categoryColors[category] || "#e39fc2"
                      : undefined,
                  color: activeTab === category ? "#2a1e29" : undefined,
                }}
                onClick={() => setActiveTab(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}

        <div className="p-6 overflow-auto max-h-[calc(80vh-73px)] bg-[#2a1e29]">
          <div className="absolute top-24 right-8 opacity-5 -z-10">
            <div className="text-9xl text-[#e39fc2]">✨</div>
          </div>

          {projectId !== "all" ? (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                {filteredProjects[0]?.thumbnail && (
                  <div className="md:w-1/3">
                    <div className="border border-[#574655] rounded-xl overflow-hidden shadow-md">
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
                  <div className="mb-4">
                    <div
                      className="inline-block px-3 py-1 text-sm rounded-full mb-3"
                      style={{
                        backgroundColor:
                          categoryColors[filteredProjects[0]?.category] ||
                          "#e39fc2",
                        color: "#2a1e29",
                      }}
                    >
                      {filteredProjects[0]?.category.charAt(0).toUpperCase() +
                        filteredProjects[0]?.category.slice(1)}
                    </div>
                    <h3 className="text-2xl text-[#f4c1d8] font-medium mb-2">
                      {filteredProjects[0]?.title}
                    </h3>
                    <p className="text-[#c4b2c3]">
                      {filteredProjects[0]?.subtitle}
                    </p>
                  </div>

                  {filteredProjects[0]?.links &&
                    filteredProjects[0]?.links.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredProjects[0].links.map((link, i) => (
                          <button
                            key={i}
                            onClick={() => handleLinkClick(link)}
                            className="px-3 py-1.5 bg-[#463343] text-[#e39fc2] rounded-full text-sm hover:bg-[#574655] transition-colors flex items-center"
                          >
                            <span className="mr-1.5">{link.icon}</span>
                            {link.label}
                          </button>
                        ))}
                      </div>
                    )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {filteredProjects[0]?.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#382736] text-[#c4b2c3] text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
                    <span className="mr-2 text-sm">✦</span>
                    Description
                    <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
                  </h4>
                  <div className="text-[#f0e6ef] space-y-3 pl-5">
                    {filteredProjects[0]?.description.map((para, i) => (
                      <p key={i} className="leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {filteredProjects[0]?.features &&
                  filteredProjects[0]?.features.length > 0 && (
                    <div>
                      <h4 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
                        <span className="mr-2 text-sm">✦</span>
                        Key Features
                        <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
                      </h4>
                      <ul className="space-y-2 pl-5">
                        {filteredProjects[0].features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start text-[#f0e6ef]"
                          >
                            <span className="text-[#e39fc2] mr-2">✦</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {filteredProjects[0]?.challenges &&
                  filteredProjects[0]?.challenges.length > 0 && (
                    <div>
                      <h4 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
                        <span className="mr-2 text-sm">✦</span>
                        Challenges & Solutions
                        <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
                      </h4>
                      <div className="space-y-4 pl-5">
                        {filteredProjects[0].challenges.map((item, i) => (
                          <div
                            key={i}
                            className="border border-[#574655] rounded-xl p-5 bg-[#382736]"
                          >
                            <h5 className="text-[#e39fc2] font-medium mb-2">
                              Challenge:
                            </h5>
                            <p className="text-[#f0e6ef] mb-3">
                              {item.challenge}
                            </p>
                            <h5 className="text-[#e39fc2] font-medium mb-2">
                              Solution:
                            </h5>
                            <p className="text-[#f0e6ef]">{item.solution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                <div className="mt-6 text-center">
                  <span className="text-[#c4b2c3] text-sm">
                    Completed in {filteredProjects[0]?.year}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-[#574655] rounded-xl overflow-hidden cursor-pointer hover:border-[#e39fc2] transition-all duration-200 bg-[#382736] hover:bg-[#3a2839] hover:shadow-lg hover:-translate-y-1 soft-card"
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.thumbnail ? (
                    <div className="relative h-40">
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1e29] to-transparent"></div>
                      <div
                        className="absolute top-3 left-3 px-2.5 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor:
                            categoryColors[project.category] || "#e39fc2",
                          color: "#2a1e29",
                        }}
                      >
                        {project.category.charAt(0).toUpperCase() +
                          project.category.slice(1)}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="h-40 flex items-center justify-center"
                      style={{
                        backgroundColor: "#382736",
                        borderBottom: `1px solid ${
                          categoryColors[project.category] || "#e39fc2"
                        }`,
                      }}
                    >
                      <span className="text-4xl">{project.emoji || "✨"}</span>
                    </div>
                  )}

                  <div className="p-4">
                    <h3 className="text-[#e39fc2] font-medium text-lg mb-2 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#c4b2c3] line-clamp-2 mb-3">
                      {project.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs bg-[#463343] text-[#c4b2c3] rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-[#463343] text-[#c4b2c3] rounded-full">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="mt-4 pt-2 border-t border-[#574655] text-right">
                      <span className="text-xs text-[#e39fc2]">
                        View details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
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

export default XiannyaaProjectsModal;
