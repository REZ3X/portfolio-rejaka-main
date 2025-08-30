"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import Logo from "@/components/main/Logo";
import Profile from "@/components/main/Profile";
import About from "@/components/main/About";
import MainSkills from "@/components/main/MainSkills";
import Projects from "@/components/main/Projects";
import LinksContact from "@/components/main/LinksContact";
import Blog from "@/components/main/Blog";
import ExperienceAchievement from "@/components/main/ExperienceAchievement";
import Others from "@/components/main/Others";
// import DevQuotes from "@/components/main/DevQuotes";
// import MiniGame from "@/components/main/MiniGame";
import Footer from "@/components/shared/Footer";
import Shuttler from "@/components/main/Shuttler";
import ClockWeather from "@/components/main/xiannyaa/ClockWeather";
// import Terminal from "@/components/terminal/Terminal";
import BotButton from "@/components/main/BotButton";
import Loader from "./Loader";
import FeminineLoader from "./FeminineLoader";
import { UserProvider, useUser } from "@/context/UserContext";
import { osData } from "@/data/OSData";
import { usersData } from "@/data/UsersData";
import { useSearchParams } from "next/navigation";
import AboutModal from "@/components/modals/AboutModal";
import ProgrammerModal from "@/components/modals/ProgrammerModal";
import AcademicModal from "@/components/modals/AcademicModal";
import CreativeModal from "@/components/modals/CreativeModal";
import ProjectsModal from "@/components/modals/ProjectsModal";
import ExperienceAchievementModal from "@/components/modals/ExperienceAchievementModal";
import MailForm from "@/components/modals/MailForm";
import BlogListModal from "@/components/modals/BlogListModal";
import VoidBotModal from "@/components/modals/VoidBotModal";
import XiannyaaVoidBotModal from "@/components/modals/xiannyaa/VoidBotModal";
import XiannyaaProjectsModal from "@/components/modals/xiannyaa/ProjectsModal";
import TerminalGuestbook from "@/components/modals/TerminalGuestbook";
import SoftGuestbook from "@/components/modals/xiannyaa/SoftGuestbook";

const ModalController = ({
  setActiveModal,
  activeModal,
  setCurrentProjectId,
  setBlogModalCategory,
  setBlogModalSearch,
}: {
  setActiveModal: (modal: string | null) => void;
  activeModal: string | null;
  setCurrentProjectId: (projectId: string) => void;
  setBlogModalCategory: (category: string) => void;
  setBlogModalSearch: (search: string) => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const modal = searchParams.get("modal");
    const project = searchParams.get("project");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    console.log("ModalController: URL changed", { modal, activeModal });

    if (modal === "voidbot") {
      setActiveModal("voidbot");
    } else if (modal === "projects") {
      setActiveModal("projects");
      if (project) {
        setCurrentProjectId(project);
      } else {
        setCurrentProjectId("all");
      }
    } else if (modal === "blogList") {
      setActiveModal("blogList");
      setBlogModalCategory(category || "all");
      setBlogModalSearch(search || "");
    } else if (modal === "guestbook") {
      setActiveModal("guestbook");
    } else if (!modal) {
      console.log("ModalController: No modal in URL, closing all");
      setActiveModal(null);
      setCurrentProjectId("all");
      setBlogModalCategory("all");
      setBlogModalSearch("");
    }
  }, [
    searchParams,
    activeModal,
    setActiveModal,
    setCurrentProjectId,
    setBlogModalCategory,
    setBlogModalSearch,
  ]);

  return null;
};

const MainContent = () => {
  const { activeUser, themeStyle } = useUser();
  const userData = usersData[activeUser];
  const [isApplicationReady, setIsApplicationReady] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string>("all");
  const [blogModalCategory, setBlogModalCategory] = useState<string>("all");
  const [blogModalSearch, setBlogModalSearch] = useState<string>("");

  const hasCompletedInitialLoad = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        setIsPageLoaded(true);
      } else {
        const handleLoad = () => setIsPageLoaded(true);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  // const openModal = (modalType: string) => {
  //   setActiveModal(modalType);
  //   if (typeof window !== "undefined") {
  //     const url = new URL(window.location.href);
  //     url.searchParams.set("modal", modalType);
  //     if (modalType === "projects") {
  //       url.searchParams.set("project", "all");
  //       setCurrentProjectId("all");
  //     } else if (modalType === "blogList") {
  //       url.searchParams.set("category", "all");
  //       setBlogModalCategory("all");
  //       setBlogModalSearch("");
  //     }
  //     window.history.pushState({}, "", url);
  //   }
  // };

  const openBlogModalWithCategory = (
    category: string = "all",
    search: string = ""
  ) => {
    setActiveModal("blogList");
    setBlogModalCategory(category);
    setBlogModalSearch(search);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "blogList");
      url.searchParams.set("category", category);
      if (search) {
        url.searchParams.set("search", search);
      }
      window.history.pushState({}, "", url);
    }
  };

  const openProjectModal = (projectId: string) => {
    setActiveModal("projects");
    setCurrentProjectId(projectId);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "projects");
      url.searchParams.set("project", projectId);
      window.history.pushState({}, "", url);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.openProjectModal = openProjectModal;
    }
  }, []);

  const closeModal = () => {
    console.log(
      "MainContent: closeModal called, current activeModal:",
      activeModal
    );
    setActiveModal(null);
    setCurrentProjectId("all");
    setBlogModalCategory("all");
    setBlogModalSearch("");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("modal");
      url.searchParams.delete("project");
      url.searchParams.delete("category");
      url.searchParams.delete("search");
      window.history.pushState({}, "", url);
    }
    console.log("MainContent: closeModal completed");
  };

  useEffect(() => {
    if (hasCompletedInitialLoad.current) {
      return;
    }

    const markAppAsReady = () => {
      const minLoadingTime = 1000;
      const startTime = Date.now();

      const finishLoading = () => {
        if (typeof window !== "undefined") {
          setIsApplicationReady(true);
          hasCompletedInitialLoad.current = true;

          if (localStorage.getItem("scrollToBlogComponent") === "true") {
            localStorage.removeItem("scrollToBlogComponent");
            setTimeout(() => {
              const blogComponent = document.querySelector(".blog-component");
              if (blogComponent) {
                const yOffset = -50;
                const y =
                  blogComponent.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }, 300);
          }
        }
      };

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

      setTimeout(finishLoading, remainingTime);
    };

    if (isPageLoaded) {
      markAppAsReady();
    } else {
      const handleLoad = () => markAppAsReady();
      window.addEventListener("load", handleLoad, { once: true });
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [isPageLoaded]);

  if (!hasCompletedInitialLoad.current && !isApplicationReady) {
    return themeStyle === "soft" ? <FeminineLoader /> : <Loader />;
  }

  return (
    <main
      className={`min-h-screen theme-bg-primary p-2 md:p-3 theme-font theme-text-primary flex flex-col ${
        themeStyle === "soft" ? "soft-fade-in" : ""
      }`}
    >
      <Suspense fallback={null}>
        <ModalController
          setActiveModal={setActiveModal}
          activeModal={activeModal}
          setCurrentProjectId={setCurrentProjectId}
          setBlogModalCategory={setBlogModalCategory}
          setBlogModalSearch={setBlogModalSearch}
        />
      </Suspense>
      <div className="max-w-7xl mx-auto space-y-6 w-full flex-grow pb-6">
        <Shuttler />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {themeStyle === "soft" ? (
            <>
              <div className="lg:col-span-4">
                <ClockWeather />
              </div>
              <div className="lg:col-span-4">
                <Profile {...userData} />
              </div>
              <div className="lg:col-span-4">
                <About />
              </div>
            </>
          ) : (
            <>
              <div className="lg:col-span-6">
                <Logo {...osData} />
              </div>
              <div className="lg:col-span-6">
                <Profile {...userData} />
              </div>
              {/* <div className="lg:col-span-3">
                <About />
              </div> */}
            </>
          )}
        </div>

        {themeStyle === "terminal" ? (
          <div className="gap-3">
            <div className="lg:col-span-2 blog-component">
              <Blog
                openBlogListModal={() => openBlogModalWithCategory("all", "")}
              />
            </div>
            {/* <div className="lg:col-span-1">
              <ExperienceAchievement />
            </div> */}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="blog-component">
              <Blog
                openBlogListModal={() => openBlogModalWithCategory("all", "")}
              />
            </div>
            <div>
              <ExperienceAchievement />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className={`lg:col-span-${themeStyle === "soft" ? "3" : "4"}`}>
            <Projects />
          </div>

          <div className={`lg:col-span-${themeStyle === "soft" ? "6" : "4"}`}>
            <MainSkills />
          </div>

          <div className={`lg:col-span-${themeStyle === "soft" ? "3" : "4"}`}>
            {/* <LinksContact /> */}
            <ExperienceAchievement />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="lg:col-span-1">
            <Others />
          </div>
          <div className="lg:col-span-1">
            {/* <MiniGame /> */}
            <LinksContact />
          </div>
          {/* <div className="lg:col-span-1">
            <DevQuotes />
          </div> */}
        </div>
      </div>

      <Footer />
      {/* <Terminal openModal={openModal} /> */}

      {activeModal === "voidbot" &&
        (themeStyle === "soft" ? (
          <XiannyaaVoidBotModal onClose={closeModal} />
        ) : (
          <VoidBotModal onClose={closeModal} />
        ))}
      {activeModal === "about" && <AboutModal onClose={closeModal} />}
      {activeModal === "programmer" && <ProgrammerModal onClose={closeModal} />}
      {activeModal === "academic" && <AcademicModal onClose={closeModal} />}
      {activeModal === "creative" && <CreativeModal onClose={closeModal} />}
      {activeModal === "projects" &&
        (themeStyle === "soft" ? (
          <XiannyaaProjectsModal
            projectId={currentProjectId}
            onClose={closeModal}
          />
        ) : (
          <ProjectsModal projectId={currentProjectId} onClose={closeModal} />
        ))}
      {activeModal === "experience" && (
        <ExperienceAchievementModal onClose={closeModal} />
      )}
      {activeModal === "contact" && (
        <MailForm recipientEmail="contact@example.com" onClose={closeModal} />
      )}
      {activeModal === "blogList" && (
        <BlogListModal
          onClose={closeModal}
          initialCategory={blogModalCategory}
          initialSearch={blogModalSearch}
          onCategoryChange={setBlogModalCategory}
          onSearchChange={setBlogModalSearch}
        />
      )}
      {activeModal === "guestbook" &&
        (themeStyle === "soft" ? (
          <SoftGuestbook onClose={closeModal} />
        ) : (
          <TerminalGuestbook onClose={closeModal} />
        ))}
      <BotButton />
    </main>
  );
};

export default function Home() {
  return (
    <UserProvider>
      <MainContent />
    </UserProvider>
  );
}
