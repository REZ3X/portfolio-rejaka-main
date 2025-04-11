import React, { useRef } from "react";
import ModalWrapper from "./ModalWrapper";

interface CreativeModalProps {
  onClose: () => void;
}

const XiannyaaCreativeModal: React.FC<CreativeModalProps> = ({ onClose }) => {
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
              <span className="text-[#e39fc2] text-xl mr-2">💕</span>
              <h2 className="text-[#f4c1d8] text-xl font-medium">
                Creative Writing
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
            <div className="text-8xl text-[#e39fc2]">💕</div>
          </div>

          <div className="mb-6">
            <p className="text-[#f0e6ef] leading-relaxed mb-4">
              While I build with code by day, I weave stories by heart. As an
              author, I’m drawn to the fragile line between the digital and the
              deeply human — exploring imagined futures, personal longing, and
              the quiet beauty of connection through every word I write.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Writing Skills
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3 text-center">
                  Genres
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Fantasy</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Fiction</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Action</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Medieval</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Teen</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Light Romance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Boys&apos; Love</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#e39fc2] mr-2">✦</span>
                        <span className="text-[#f0e6ef]">Technical</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3 text-center">
                  Formats
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Short Story</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Light Novel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Technical Blogs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Current Status
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
              <h4 className="text-[#e39fc2] font-medium mb-3">
                Trying to break free from writer&apos;s block
              </h4>
              <p className="text-sm text-[#f0e6ef] mb-3">
                Currently navigating through creative obstacles and seeking new
                sources of inspiration. Taking time to explore different
                narrative techniques and gather ideas for future stories.
              </p>
              <div className="mt-3 w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full animate-pulse-slow"
                  style={{ width: "25%" }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-[#c4b2c3]">
                <span>Writer&apos;s block</span>
                <span>Creative freedom</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Technical Writing
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
              <p className="text-sm text-[#f0e6ef] mb-3">
                Besides creative writing, I occasionally share my thoughts and
                discoveries through technical articles on:
              </p>
              <ul className="text-sm space-y-2 pl-2">
                <li className="flex items-start">
                  <span className="text-[#e39fc2] mr-2">✦</span>
                  <span className="text-[#f0e6ef]">Medium</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#e39fc2] mr-2">✦</span>
                  <span className="text-[#f0e6ef]">My Personal Blog</span>
                </li>
              </ul>
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

export default XiannyaaCreativeModal;
