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
              My academic journey began at a vocational high school where I’ve
              been building a solid foundation in computer science, focusing on
              both theoretical concepts and practical applications. I actively
              deepen my understanding through coursework, personal projects, and
              self-directed learning beyond the classroom.
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
                  System Information Network and Application Major
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  Depok Sleman 2nd State Vocational High School • 2023-Present
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  Currently pursuing a degree in System Information Network and
                  Application, focusing on web development, server and network
                  management.
                </p>
              </div>

              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-1">
                  Best Graduate of the Year
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  Yogyakarta 6th State Junior High School • 2020-2023
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  Graduated with honors, recognized for outstanding academic
                  performance and contributions to school activities.
                </p>
              </div>

              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-1">
                  Elementary Student
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  Glagah State Elementary School • 2014-2020
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  Completed elementary education with a focus on foundational
                  subjects.
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
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs text-[#c4b2c3]">
                  Intermediate
                </div>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2 text-center">
                  Indonesia
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
                  Javanese
                </h4>
                <div className="flex items-center mb-1">
                  <div className="w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="text-center text-xs text-[#c4b2c3]">Native</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Core Focus Areas
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3">
                  System Information Network Application
                </h4>
                <ul className="text-sm space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Network Design & Infrastructure Management
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Security Systems & Protocol Implementation
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Front-end Development with Modern Frameworks
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Data Management & Integration Services
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
