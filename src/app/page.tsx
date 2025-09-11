"use client";
import React, { useState, useEffect, Suspense, useRef, useCallback } from "react";
import Logo from "@/components/main/Logo";
import Profile from "@/components/main/Profile";
import About from "@/components/main/About";
import MainSkills from "@/components/main/MainSkills";
import Projects from "@/components/main/Projects";
import LinksContact from "@/components/main/LinksContact";
import Blog from "@/components/main/Blog";
import ExperienceAchievement from "@/components/main/ExperienceAchievement";
import Others from "@/components/main/Others";
import Footer from "@/components/shared/Footer";
import Shuttler from "@/components/main/Shuttler";
import ClockWeather from "@/components/main/xiannyaa/ClockWeather";
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
import TerminalGuestbook from "@/components/modals/TerminalGuestbook";

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
  const [isMounted, setIsMounted] = useState(false);

  const hasCompletedInitialLoad = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      const handleLoad = () => setIsPageLoaded(true);
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, [isMounted]);

  const openBlogModalWithCategory = useCallback((
    category: string = "all",
    search: string = ""
  ) => {
    setActiveModal("blogList");
    setBlogModalCategory(category);
    setBlogModalSearch(search);
    if (isMounted) {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "blogList");
      url.searchParams.set("category", category);
      if (search) {
        url.searchParams.set("search", search);
      }
      window.history.pushState({}, "", url);
    }
  }, [isMounted]);

  const openProjectModal = useCallback((projectId: string) => {
    setActiveModal("projects");
    setCurrentProjectId(projectId);
    if (isMounted) {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "projects");
      url.searchParams.set("project", projectId);
      window.history.pushState({}, "", url);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      window.openProjectModal = openProjectModal;
    }
  }, [isMounted, openProjectModal]);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setCurrentProjectId("all");
    setBlogModalCategory("all");
    setBlogModalSearch("");
    if (isMounted) {
      const url = new URL(window.location.href);
      url.searchParams.delete("modal");
      url.searchParams.delete("project");
      url.searchParams.delete("category");
      url.searchParams.delete("search");
      window.history.pushState({}, "", url);
    }
  }, [isMounted]);

  useEffect(() => {
    if (hasCompletedInitialLoad.current || !isMounted) {
      return;
    }

    const markAppAsReady = () => {
      const minLoadingTime = 1000;
      const startTime = Date.now();

      const finishLoading = () => {
        setIsApplicationReady(true);
        hasCompletedInitialLoad.current = true;

        const loaders = document.querySelectorAll('[data-ad-exclude="true"]');
        loaders.forEach(loader => {
          if (loader instanceof HTMLElement) {
            loader.style.display = 'none';
          }
        });

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
  }, [isPageLoaded, isMounted]);

  if (!isMounted || (!hasCompletedInitialLoad.current && !isApplicationReady)) {
    const LoaderComponent = themeStyle === "soft" ? FeminineLoader : Loader;
    return <LoaderComponent />;
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
            <ExperienceAchievement />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="lg:col-span-1">
            <Others />
          </div>
          <div className="lg:col-span-1">
            <LinksContact />
          </div>
        </div>
      </div>

      <Footer />

      {activeModal === "voidbot" && <VoidBotModal onClose={closeModal} />}
      {activeModal === "about" && <AboutModal onClose={closeModal} />}
      {activeModal === "programmer" && <ProgrammerModal onClose={closeModal} />}
      {activeModal === "academic" && <AcademicModal onClose={closeModal} />}
      {activeModal === "creative" && <CreativeModal onClose={closeModal} />}
      {activeModal === "projects" && (
        <ProjectsModal projectId={currentProjectId} onClose={closeModal} />
      )}
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
      {activeModal === "guestbook" && (
        <TerminalGuestbook onClose={closeModal} />
      )}
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