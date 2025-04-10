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
import Footer from "@/components/main/Footer";
import Shuttler from "@/components/main/Shuttler";
import ClockWeather from "@/components/main/xiannyaa/ClockWeather";
import Terminal from "@/components/terminal/Terminal";
import Loader from "./Loader";
import FeminineLoader from "./FeminineLoader";
import { UserProvider, useUser } from "@/context/UserContext";
import { osData } from "@/data/OSData";
import { usersData } from "@/data/UsersData";

import AboutModal from "@/components/modals/AboutModal";
import ProgrammerModal from "@/components/modals/ProgrammerModal";
import AcademicModal from "@/components/modals/AcademicModal";
import CreativeModal from "@/components/modals/CreativeModal";
import ProjectsModal from "@/components/modals/ProjectsModal";
import ExperienceAchievementModal from "@/components/modals/ExperienceAchievementModal";
import MailForm from "@/components/modals/MailForm";

const MainContent = () => {
  const { activeUser, themeStyle } = useUser();
  const userData = usersData[activeUser];
  const [isApplicationReady, setIsApplicationReady] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeStyle);

    const isPageLoaded = document.readyState === "complete";

    const markAppAsReady = () => {
      const overlay = document.querySelector(".theme-transition-overlay");
      if (overlay) {
        overlay.classList.remove("active");
        setTimeout(() => overlay.remove(), 300);
      }

      const delay = isPageLoaded ? 800 : 1500;
      setTimeout(() => {
        setIsApplicationReady(true);
      }, delay);
    };

    if (isPageLoaded) {
      markAppAsReady();
    } else {
      window.addEventListener("load", markAppAsReady, { once: true });

      const timeoutId = setTimeout(markAppAsReady, 4000);
      return () => {
        window.removeEventListener("load", markAppAsReady);
        clearTimeout(timeoutId);
      };
    }
  }, [themeStyle]);

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

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
          <div>
            <Blog />
          </div>

          <div>
            <ExperienceAchievement />
          </div>
        </div>
      </div>

      <Footer />

      <Terminal openModal={openModal} />

      {activeModal === "about" && <AboutModal onClose={closeModal} />}
      {activeModal === "programmer" && <ProgrammerModal onClose={closeModal} />}
      {activeModal === "academic" && <AcademicModal onClose={closeModal} />}
      {activeModal === "creative" && <CreativeModal onClose={closeModal} />}
      {activeModal === "projects" && (
        <ProjectsModal projectId="all" onClose={closeModal} />
      )}
      {activeModal === "experience" && (
        <ExperienceAchievementModal onClose={closeModal} />
      )}
      {activeModal === "contact" && (
        <MailForm recipientEmail="contact@example.com" onClose={closeModal} />
      )}
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
