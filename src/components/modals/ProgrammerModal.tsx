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
              I’m a web developer passionate about crafting responsive and
              accessible digital experiences. Beyond the front end, I’m
              expanding into full-stack development and database engineering —
              driven by a desire to understand the full architecture of the
              systems I build. I&apos;m also exploring game development, pushing the
              boundaries of how technology and creativity can collide.
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
                    <span>React</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>CSS3</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Tailwind CSS</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Vite</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Backend</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Node.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>MySQL / Aiven</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>MongoDB / Atlas</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Full Stack</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Next.js</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>JavaScript</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>TypeScript</span>
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
                    <span>Vercel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Virtual Private Server</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Tools</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>VS Code</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>WebStorm IDE</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>DB Tools</span>
                  </li>
                </ul>
              </div>

              <div className="border border-[#393d46] p-3">
                <h4 className="text-[#00adb4] font-bold mb-2">Other</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Cloudflare</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>Godot Engine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#188d93] mr-2">›</span>
                    <span>GDScript</span>
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

export default ProgrammerModal;
