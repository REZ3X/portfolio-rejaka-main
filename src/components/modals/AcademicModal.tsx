import React, { useEffect, useRef } from "react";

interface AcademicModalProps {
  onClose: () => void;
}

const AcademicModal: React.FC<AcademicModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
        className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-2xl w-full max-h-[80vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#060a10] z-10 border-b border-[#393d46] flex justify-between items-center p-4">
          <div className="flex items-center">
            <span className="text-[#00adb4] text-xl mr-2">🎓</span>
            <h2 className="text-[#00adb4] text-xl font-bold">
              Academic Background
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4] text-xs"
          >
            [x] close
          </button>
        </div>

        <div className="p-4">
          <div className="mb-6">
            <p className="text-sm leading-relaxed mb-4">
              My academic journey has provided me with a strong foundation in
              computer science principles and research methodologies. I'm
              constantly expanding my knowledge through formal education and
              self-directed learning.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Education</h3>
            <div className="space-y-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  BSc in Computer Science
                </h4>
                <p className="text-sm text-[#393d46]">
                  University of Technology • 2018-2022
                </p>
                <p className="text-sm mt-2">
                  Specialized in Software Engineering and Distributed Systems.
                  Graduated with honors.
                </p>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  MSc in Computer Science
                </h4>
                <p className="text-sm text-[#393d46]">
                  University of Technology • 2022-Present
                </p>
                <p className="text-sm mt-2">
                  Focusing on Human-Computer Interaction and Web Technologies.
                  Expected graduation in 2024.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Languages</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">English</h4>
                <div className="flex items-center">
                  <div className="w-full bg-[#202832] h-3">
                    <div
                      className="bg-[#00adb4] h-3"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">Native</span>
                </div>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Spanish</h4>
                <div className="flex items-center">
                  <div className="w-full bg-[#202832] h-3">
                    <div
                      className="bg-[#00adb4] h-3"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">Fluent</span>
                </div>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">French</h4>
                <div className="flex items-center">
                  <div className="w-full bg-[#202832] h-3">
                    <div
                      className="bg-[#00adb4] h-3"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">Intermediate</span>
                </div>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Japanese</h4>
                <div className="flex items-center">
                  <div className="w-full bg-[#202832] h-3">
                    <div
                      className="bg-[#00adb4] h-3"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">Basic</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Research</h3>
            <div className="space-y-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">Published Papers</h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>
                      "Improving Web Accessibility through AI-assisted Interface
                      Design" (2023)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>
                      "Patterns for Responsive Web Design in Educational
                      Applications" (2022)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  Current Research Focus
                </h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>
                      User Experience Optimization for Cross-platform
                      Applications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Cognitive Load Reduction in Web Interfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicModal;
