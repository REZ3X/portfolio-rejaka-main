"use client";
import React, { useState, useEffect } from "react";
import Logo from "@/components/main/Logo";
import Profile from "@/components/main/Profile";
import About from "@/components/main/About";
import MainSkills from "@/components/main/MainSkills";
import Projects from "@/components/main/Projects";
import LinksContact from "@/components/main/LinksContact";
import Blog from "@/components/main/Blog";
import ExperienceAchievement from "@/components/main/ExperienceAchievement";
import Footer from "@/components/shared/Footer";
import Shuttler from "@/components/main/Shuttler";
import ClockWeather from "@/components/main/xiannyaa/ClockWeather";
import Terminal from "@/components/terminal/Terminal";
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

const MainContent = () => {
  const { activeUser, themeStyle } = useUser();
  const userData = usersData[activeUser];
  const [isApplicationReady, setIsApplicationReady] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const searchParams = useSearchParams();


  useEffect(() => {
    const modal = searchParams.get("modal");
    if (modal === "voidbot") {
      setActiveModal("voidbot");
    } else if (searchParams.toString() === "" && activeModal === "voidbot") {
      setActiveModal(null);
    }
  }, [searchParams]);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
    const url = new URL(window.location.href);
    url.searchParams.set("modal", modalType);
    window.history.pushState({}, "", url);
  };

  const closeModal = () => {
    setActiveModal(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("modal");
    window.history.pushState({}, "", url);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeStyle);

    const isPageLoaded = document.readyState === "complete";

    const markAppAsReady = () => {
      setIsApplicationReady(true);

      if (typeof window !== "undefined") {
        const returnFromBlog = localStorage.getItem("returnFromBlog");

        if (returnFromBlog === "true") {
          localStorage.removeItem("returnFromBlog");

          const reopenBlogList = localStorage.getItem("reopenBlogList");
          if (reopenBlogList === "true") {
            localStorage.removeItem("reopenBlogList");
            setTimeout(() => {
              setActiveModal("blogList");
            }, 300);
          }

          const scrollToBlogComponent = localStorage.getItem(
            "scrollToBlogComponent"
          );
          if (scrollToBlogComponent === "true") {
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
      }
    };

    if (isPageLoaded) {
      markAppAsReady();
    } else {
      window.addEventListener("load", markAppAsReady, { once: true });
    }

    return () => {
      window.removeEventListener("load", markAppAsReady);
    };
  }, [themeStyle]);

  if (!isApplicationReady) {
    return themeStyle === "soft" ? <FeminineLoader /> : <Loader />;
  }

  return (
    <main
      className={`min-h-screen theme-bg-primary p-2 md:p-3 theme-font theme-text-primary flex flex-col ${
        themeStyle === "soft" ? "soft-fade-in" : ""
      }`}
    >
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
              <div className="lg:col-span-3">
                <Profile {...userData} />
              </div>
              <div className="lg:col-span-3">
                <About />
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          <div className={`lg:col-span-${themeStyle === "soft" ? "3" : "4"}`}>
            <Projects />
          </div>

          <div className={`lg:col-span-${themeStyle === "soft" ? "6" : "4"}`}>
            <MainSkills />
          </div>

          <div className={`lg:col-span-${themeStyle === "soft" ? "3" : "4"}`}>
            <LinksContact />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="blog-component">
            <Blog openBlogListModal={() => setActiveModal("blogList")} />
          </div>

          <div>
            <ExperienceAchievement />
          </div>
        </div>
      </div>

      <Footer />

      <Terminal openModal={openModal} />

      {activeModal === "voidbot" &&
        (themeStyle === "soft" ? (
          <XiannyaaVoidBotModal onClose={closeModal} />
        ) : (
          <VoidBotModal onClose={closeModal} />
        ))}
      {activeModal === "about" && <AboutModal onClose={closeModal} />}
      {activeModal === "about" && <AboutModal onClose={closeModal} />}
      {activeModal === "programmer" && <ProgrammerModal onClose={closeModal} />}
      {activeModal === "academic" && <AcademicModal onClose={closeModal} />}
      {activeModal === "creative" && <CreativeModal onClose={closeModal} />}
      {activeModal === "blogList" && <BlogListModal onClose={closeModal} />}
      {activeModal === "projects" && (
        <ProjectsModal projectId="all" onClose={closeModal} />
      )}
      {activeModal === "experience" && (
        <ExperienceAchievementModal onClose={closeModal} />
      )}
      {activeModal === "contact" && (
        <MailForm recipientEmail="contact@example.com" onClose={closeModal} />
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
