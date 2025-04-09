import React, { useRef } from "react";
import ModalWrapper from "./ModalWrapper";

interface ProgrammerModalProps {
  onClose: () => void;
}

const XiannyaaProgrammerModal: React.FC<ProgrammerModalProps> = ({
  onClose,
}) => {
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
              <span className="text-[#e39fc2] text-xl mr-2">🌸</span>
              <h2 className="text-[#f4c1d8] text-xl font-medium">
                Web Developer
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
            <div className="text-8xl text-[#e39fc2]">🌸</div>
          </div>

          <div className="mb-6">
            <p className="text-[#f0e6ef] leading-relaxed mb-4">
              As a web developer, I specialize in creating responsive,
              accessible, and interactive web applications. My focus is on
              delivering clean code and intuitive user experiences with an
              emphasis on beautiful design.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Tech Stack
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3 text-center">
                  Frontend
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">React / Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">TypeScript</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Tailwind CSS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Redux / Context API</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3 text-center">
                  Backend
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Node.js / Express</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">GraphQL / REST</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">MongoDB / PostgreSQL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Authentication systems
                    </span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3 text-center">
                  DevOps
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Git / GitHub</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Docker</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">CI/CD pipelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Vercel / Netlify</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Recent Projects
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2">
                  E-commerce Platform
                </h4>
                <p className="text-sm text-[#f0e6ef] mb-3">
                  Full-featured online store with payment processing, inventory
                  management, and admin dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    React
                  </span>
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    Node.js
                  </span>
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    MongoDB
                  </span>
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    Stripe
                  </span>
                </div>
              </div>

              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-2">
                  Content Management System
                </h4>
                <p className="text-sm text-[#f0e6ef] mb-3">
                  Custom CMS built for a digital publication, featuring markdown
                  support and publishing workflow.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    Next.js
                  </span>
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    TypeScript
                  </span>
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    PostgreSQL
                  </span>
                  <span className="text-xs px-3 py-1 bg-[#463343] text-[#e39fc2] rounded-full">
                    AWS
                  </span>
                </div>
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

export default XiannyaaProgrammerModal;
