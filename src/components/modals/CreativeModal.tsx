import React, { useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";

interface CreativeModalProps {
  onClose: () => void;
}

const CreativeModal: React.FC<CreativeModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { themeStyle } = useUser();

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
        className={`${
          themeStyle === "soft"
            ? "theme-font theme-bg-primary theme-text-primary rounded-2xl border theme-border max-w-2xl w-full max-h-[80vh] overflow-auto shadow-lg"
            : "font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-2xl w-full max-h-[80vh] overflow-auto"
        }`}
      >
        <div
          className={`sticky top-0 z-10 border-b theme-border flex justify-between items-center p-4 ${
            themeStyle === "soft" ? "theme-bg-primary" : "bg-[#060a10]"
          }`}
        >
          <div className="flex items-center">
            <span className="theme-accent-primary text-xl mr-2">✒️</span>
            <h2 className="theme-accent-primary text-xl font-bold">
              Creative Writing
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`px-2 py-1 text-xs ${
              themeStyle === "soft"
                ? "bg-[#463343] theme-text-primary border theme-border hover:bg-[#574655] rounded-lg"
                : "bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4]"
            }`}
          >
            {themeStyle === "soft" ? "Close" : "[x] close"}
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <p className="text-sm leading-relaxed mb-4">
              Beyond coding, I'm passionate about creative writing. As an
              author, I explore the intersection of technology, humanity, and
              speculative futures through various formats and genres.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="theme-accent-primary text-lg mb-2">
              Published Works
            </h3>
            <div className="space-y-4">
              <div
                className={`border theme-border p-3 ${
                  themeStyle === "soft" ? "rounded-lg" : ""
                }`}
              >
                <h4 className="theme-accent-primary font-bold">
                  "Digital Horizons" (Short Story Collection)
                </h4>
                <p className="text-sm theme-text-secondary">
                  Published 2023 • TechFiction Press
                </p>
                <p className="text-sm mt-2">
                  A collection of ten speculative fiction stories exploring
                  near-future technologies and their impact on society.
                </p>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  "The Compiler" (Novel)
                </h4>
                <p className="text-sm text-[#393d46]">
                  Published 2022 • Quantum Books
                </p>
                <p className="text-sm mt-2">
                  A science fiction novel set in a world where programmers are
                  viewed as modern-day wizards, manipulating reality through
                  code.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Writing Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Genres</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Science Fiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Speculative Fiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Technical Non-Fiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Creative Essays</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Formats</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Short Stories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Novels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Technical Blogs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Screenplays</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Current Projects</h3>
            <div className="border border-[#393d46] p-3">
              <h4 className="text-[#00adb4] font-bold">
                "Code as Poetry" (Anthology)
              </h4>
              <p className="text-sm mt-2">
                A collaborative anthology exploring the aesthetic aspects of
                programming languages, co-edited with other developer-writers.
              </p>
              <div className="mt-2 w-full bg-[#202832] h-3">
                <div
                  className="bg-[#00adb4] h-3"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1">
                65% Complete • Expected 2025
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Technical Writing</h3>
            <div className="border border-[#393d46] p-3">
              <p className="text-sm">
                Besides creative writing, I maintain a technical blog where I
                share tutorials, insights, and experiences from my development
                journey. My articles have been featured in publications like:
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li className="flex items-start">
                  <span className="text-[#188d93] mr-2">›</span>
                  <span>Dev.to (Top Contributor 2023)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#188d93] mr-2">›</span>
                  <span>Medium (JavaScript Monthly)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#188d93] mr-2">›</span>
                  <span>CSS-Tricks (Guest Author)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeModal;
