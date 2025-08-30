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
              My academic journey began at a vocational high school where I’ve
              been building a solid foundation in computer science, focusing on
              both theoretical concepts and practical applications. I actively
              deepen my understanding through coursework, personal projects, and
              self-directed learning beyond the classroom.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Education</h3>
            <div className="space-y-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  System Information Network and Application Major
                </h4>
                <p className="text-sm text-[#393d46]">
                  Depok Sleman 2nd State Vocational High School • 2023-Present
                </p>
                <p className="text-sm mt-2">
                  Currently pursuing a degree in System Information Network and
                  Application, focusing on web development, server and network
                  management.
                </p>
              </div>

              {/* <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  Best Graduate of the Year
                </h4>
                <p className="text-sm text-[#393d46]">
                  Yogyakarta 6th State Junior High School • 2020-2023
                </p>
                <p className="text-sm mt-2">
                  Graduated with honors, recognized for outstanding academic
                  performance and contributions to school activities.
                </p>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">Elementary Student</h4>
                <p className="text-sm text-[#393d46]">
                  Glagah State Elementary School • 2014-2020
                </p>
                <p className="text-sm mt-2">
                  Completed elementary education with a focus on foundational
                  subjects.
                </p>
              </div> */}
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
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">Intermediate</span>
                </div>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Indonesia</h4>
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
                <h4 className="text-[#00adb4] font-bold mb-2">Javanese</h4>
                <div className="flex items-center">
                  <div className="w-full bg-[#202832] h-3">
                    <div
                      className="bg-[#00adb4] h-3"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs">Native</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Core Focus Areas</h3>
            <div className="space-y-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  System Information Network Application
                </h4>
                <ul className="text-sm space-y-2 mt-2">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Network Infrastructure Design and Management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Server Administration and System Security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Web Application Development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Database Management and Integration</span>
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
