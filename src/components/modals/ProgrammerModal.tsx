import React, { useEffect, useRef } from "react";

interface ProgrammerModalProps {
  onClose: () => void;
}

const ProgrammerModal: React.FC<ProgrammerModalProps> = ({ onClose }) => {
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
            <span className="text-[#00adb4] text-xl mr-2">💻</span>
            <h2 className="text-[#00adb4] text-xl font-bold">Web Developer</h2>
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
              As a web developer, I specialize in creating responsive,
              accessible, and interactive web applications. My focus is on
              delivering clean code and intuitive user experiences.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Tech Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Frontend</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>React / Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>TypeScript</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Redux / Context API</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Backend</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Node.js / Express</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>GraphQL / REST</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>MongoDB / PostgreSQL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Authentication systems</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">DevOps</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Git / GitHub</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Docker</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>CI/CD pipelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Vercel / Netlify</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#00adb4] text-lg mb-2">Recent Projects</h3>
            <div className="space-y-4">
              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  E-commerce Platform
                </h4>
                <p className="text-sm my-1">
                  Full-featured online store with payment processing, inventory
                  management, and admin dashboard.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    React
                  </span>
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    Node.js
                  </span>
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    MongoDB
                  </span>
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    Stripe
                  </span>
                </div>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold">
                  Content Management System
                </h4>
                <p className="text-sm my-1">
                  Custom CMS built for a digital publication, featuring markdown
                  support and publishing workflow.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    Next.js
                  </span>
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    TypeScript
                  </span>
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    PostgreSQL
                  </span>
                  <span className="text-xs bg-[#202832] px-1.5 py-0.5 border border-[#393d46]">
                    AWS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammerModal;
