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
              Beyond coding, I'm passionate about creative writing. As an
              author, I explore the intersection of technology, humanity, and
              speculative futures through various formats and genres, always
              with a touch of emotion and imagination.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Published Works
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-1">
                  "Digital Horizons" (Short Story Collection)
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  Published 2023 • TechFiction Press
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  A collection of ten speculative fiction stories exploring
                  near-future technologies and their impact on society, with a
                  focus on human relationships.
                </p>
              </div>

              <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-1">
                  "The Compiler" (Novel)
                </h4>
                <p className="text-sm text-[#c4b2c3] mb-3">
                  Published 2022 • Quantum Books
                </p>
                <p className="text-sm text-[#f0e6ef]">
                  A science fiction novel set in a world where programmers are
                  viewed as modern-day wizards, manipulating reality through
                  code, while navigating complex emotional connections.
                </p>
              </div>
            </div>
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
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Science Fiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Speculative Fiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">
                      Technical Non-Fiction
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Creative Essays</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#574655] rounded-xl p-4 bg-[#382736]">
                <h4 className="text-[#e39fc2] font-medium mb-3 text-center">
                  Formats
                </h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Short Stories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Novels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Technical Blogs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#e39fc2] mr-2">✦</span>
                    <span className="text-[#f0e6ef]">Screenplays</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#e39fc2] text-lg font-medium mb-4 flex items-center">
              <span className="mr-2 text-sm">✦</span>
              Current Projects
              <div className="flex-grow ml-3 h-px bg-gradient-to-r from-[#574655] to-transparent"></div>
            </h3>
            <div className="border border-[#574655] rounded-xl p-5 bg-[#382736]">
              <h4 className="text-[#e39fc2] font-medium mb-3">
                "Code as Poetry" (Anthology)
              </h4>
              <p className="text-sm text-[#f0e6ef] mb-3">
                A collaborative anthology exploring the aesthetic aspects of
                programming languages, co-edited with other developer-writers.
              </p>
              <div className="mt-3 w-full bg-[#463343] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#b4688f] to-[#e39fc2] h-full rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-[#c4b2c3]">
                65% Complete • Expected 2025
              </p>
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
                Besides creative writing, I maintain a technical blog where I
                share tutorials, insights, and experiences from my development
                journey. My articles have been featured in publications like:
              </p>
              <ul className="text-sm space-y-2 pl-2">
                <li className="flex items-start">
                  <span className="text-[#e39fc2] mr-2">✦</span>
                  <span className="text-[#f0e6ef]">
                    Dev.to (Top Contributor 2023)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#e39fc2] mr-2">✦</span>
                  <span className="text-[#f0e6ef]">
                    Medium (JavaScript Monthly)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#e39fc2] mr-2">✦</span>
                  <span className="text-[#f0e6ef]">
                    CSS-Tricks (Guest Author)
                  </span>
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
