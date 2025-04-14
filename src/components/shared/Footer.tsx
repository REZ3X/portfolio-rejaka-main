import React from "react";
import { useUser } from "@/context/UserContext";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { themeStyle } = useUser();

  const lastUpdated = "14 April 2025";
  // const startCode = "6 April 2025";

  if (themeStyle === "terminal") {
    return (
      <footer className="font-mono text-[#393d46] text-[10px] py-2 text-center border-t border-[#393d46] mt-2 mb-12">
        <div className="flex justify-center items-center space-x-3">
          <span>© {currentYear} Rejaka Abimanyu Susanto - All Rights Reserved</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">
            Built with Next.js
          </span>
          <span className="hidden md:inline">•</span>

          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">{`Last updated: ${lastUpdated}`}</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="theme-font text-[#c4b2c3] text-xs py-3 text-center border-t border-[#574655] mt-2 mb-12">
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-2 md:space-y-0">
        <div className="flex items-center">
          <span className="text-[#e39fc2]">♥</span>
          <span className="mx-2">© {currentYear} Rejaka Abimanyu Susanto - All Rights Reserved</span>
          <span className="text-[#e39fc2]">♥</span>
        </div>
        <span className="hidden md:inline text-[#574655]">|</span>
        <span className="hidden md:inline">
          Crafted with love using Next.js
        </span>
        <span className="hidden md:inline text-[#574655]">|</span>
        <span className="hidden md:inline">{`Updated: ${lastUpdated}`}</span>
      </div>
    </footer>
  );
};

export default Footer;