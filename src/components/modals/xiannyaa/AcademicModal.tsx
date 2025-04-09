import React, { useRef } from "react";
import ModalWrapper from "./ModalWrapper";

interface AcademicModalProps {
  onClose: () => void;
}

const XiannyaaAcademicModal: React.FC<AcademicModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <ModalWrapper onClose={onClose}>
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border border-[#574655] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
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
                Academic Background
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
          >
            Close
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(80vh-72px)]">
          <div className="absolute top-16 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e39fc2]">✨</div>
          </div>

          <div className="mb-6">
            <p className="text-[#f0e6ef] leading-relaxed mb-4">
              My academic journey has provided me with a strong foundation in
              computer science principles and research methodologies. I'm
              constantly expanding my knowledge through formal education and
              self-directed learning.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Education
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-1">
                  BSc in Computer Science
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  University of Technology • 2018-2022
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  Specialized in Software Engineering and Distributed Systems.
                  Graduated with honors.
                </p>
              </div>

              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-1">
                  MSc in Computer Science
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  University of Technology • 2022-Present
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  Focusing on Human-Computer Interaction and Web Technologies.
                  Expected graduation in 2024.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Languages
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2 text-center">
                  English
                </h4>
                <div className="flex items-center mb-1">
                  <div className="w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs text-[#c4b2c3]">Native</div>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2 text-center">
                  Spanish
                </h4>
                <div className="flex items-center mb-1">
                  <div className="w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs text-[#c4b2c3]">Fluent</div>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2 text-center">
                  French
                </h4>
                <div className="flex items-center mb-1">
                  <div className="w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs text-[#c4b2c3]">
                  Intermediate
                </div>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2 text-center">
                  Japanese
                </h4>
                <div className="flex items-center mb-1">
                  <div className="w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs text-[#c4b2c3]">Basic</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Research
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3">
                  Published Papers
                </h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      "Improving Web Accessibility through AI-assisted Interface
                      Design" (2023)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      "Patterns for Responsive Web Design in Educational
                      Applications" (2022)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3">
                  Current Research Focus
                </h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      User Experience Optimization for Cross-platform
                      Applications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Cognitive Load Reduction in Web Interfaces
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#e39fc2] to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default XiannyaaAcademicModal;
