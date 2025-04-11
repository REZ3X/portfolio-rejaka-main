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
              While I build with code by day, I weave stories by heart. As an
              author, I’m drawn to the fragile line between the digital and the
              deeply human — exploring imagined futures, personal longing, and
              the quiet beauty of connection through every word I write.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Writing Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Genres</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Fantasy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Fiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Action</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Medieval</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Teen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Light Romance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Boys&#39; Love</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Technical Non-Fiction</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Formats</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Short Story</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Light Novel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Technical Blogs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Current Status</h3>
            <div className="border border-[#393d46] p-3">
              <h4 className="text-[#00adb4] font-bold">
                Trying to break free from writer&apos;s block
              </h4>
              <p className="text-sm mt-2">
                Currently navigating through creative obstacles and seeking new
                sources of inspiration. Taking time to explore different
                narrative techniques and gather ideas for future stories.
              </p>
              <div className="mt-2 flex items-center">
                <div className="w-full bg-[#202832] h-3">
                  <div
                    className="bg-[#00adb4] h-3 animate-pulse"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <span className="ml-2 text-xs">Progress</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Technical Writing</h3>
            <div className="border border-[#393d46] p-3">
              <p className="text-sm">
                Besides creative writing, I occasionally share my thoughts and
                discoveries through technical articles on:
              </p>
              <ul className="text-sm space-y-1 mt-2">
                <li className="flex items-start">
                  <span className="text-[#188d93] mr-2">›</span>
                  <span>Medium</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#188d93] mr-2">›</span>
                  <span>My Personal Blog</span>
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
