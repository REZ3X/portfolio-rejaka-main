"use client";
import React, { useState, useEffect, useMemo } from "react";

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [rotationY, setRotationY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setRotationY((prevY) => prevY + deltaTime * 0.1);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const bootLines = useMemo(
    () => [
      "BIOS initialized, starting boot sequence...",
      "Loading kernel modules...",
      "Mounting root filesystem...",
      "Initializing hardware drivers...",
      "Starting system services...",
      "Configuring network interfaces...",
      "Loading web server components...",
      "Initializing database connections...",
      "Starting security protocols...",
      "Loading OS components...",
      "Checking system dependencies...",
      "Optimizing system assets...",
      "Establishing secure connections...",
      "Finalizing system initialization...",
      "System ready for deployment!",
    ],
    []
  );

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        let increment = 1.0;
        if (prev < 20) increment = 1.7;
        else if (prev < 60) increment = 1.5;
        else if (prev < 85) increment = 1.2;
        else increment = 0.8;

        return Math.min(prev + increment, 100);
      });
    }, 10);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 300);

    const bootLineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= bootLines.length - 1) {
          clearInterval(bootLineInterval);
          return bootLines.length - 1;
        }
        return prev + 1;
      });
    }, 100);
    return () => {
      clearInterval(progressInterval);
      clearInterval(cursorInterval);
      clearInterval(bootLineInterval);
    };
  }, [bootLines]);

  const customAsciiArt = `   
    ##############  ######     
         ######    ######      
          ######  ######       
          ###### ######        
           ######              
           #######             
            ######             
             ######            
        ############           
       ###### #######          
      ######   ######          
     #######    ######         
     ######  ##############    
    ######  ###############         
  `;

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-[#060a10] z-50 font-mono text-[#e0e0e0] p-4 overflow-auto flex flex-col"
      data-ad-exclude="true"
    >
      <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
        <h1>Rejaka Abimanyu Susanto - Full Stack Developer Portfolio</h1>
        <p>Welcome to the portfolio of Rejaka Abimanyu Susanto, a full-stack web developer specializing in modern web technologies including Next.js, React, TypeScript, and MongoDB. Explore projects, technical blog articles, and professional experience.</p>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      
      <div className="max-w-3xl mx-auto w-full flex-grow">
        <div className="mb-6 flex flex-col items-center">
          <div className="ascii-container relative mb-4">
            <div className="text-center select-none">
              <pre
                className="ascii-logo text-[#00adb4] text-xs whitespace-pre leading-tight inline-block"
                style={{
                  transform: `perspective(800px) rotateY(${
                    rotationY % 360
                  }deg)`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "visible",
                }}
              >
                {customAsciiArt}
              </pre>
            </div>
          </div>
          <div className="text-xs mb-2 text-[#00adb4]">LiNXOS v0.10.0</div>
          <div className="text-xs text-[#393d46] mb-4">
            System initializing...
          </div>
        </div>

        <div className="space-y-1.5 mb-6 border border-[#393d46] bg-[#0c1219] p-3 min-h-[240px]">
          {bootLines.slice(0, currentLine + 1).map((line, index) => (
            <div
              key={index}
              className="flex animate-flicker"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              <span className="text-[#00adb4] mr-2">[boot]</span>
              <span className="text-[#e0e0e0]">{line}</span>
              {index === currentLine && (
                <span
                  className={`ml-1 text-[#00adb4] transition-opacity duration-75 ${
                    showCursor ? "opacity-100" : "opacity-0"
                  }`}
                >
                  _
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="w-full mt-4">
          <div className="border border-[#393d46] w-full bg-[#0c1219] relative overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#107f84] via-[#00adb4] to-[#188d93] h-2 transition-all duration-150 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                style={{
                  animation:
                    progress < 100 ? "shimmer 0.8s linear infinite" : "none",
                }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-[#e0e0e0]">
              {progress < 30
                ? "Initializing..."
                : progress < 60
                ? "Loading components..."
                : progress < 90
                ? "Finalizing..."
                : "System ready!"}
            </span>
            <span className="text-[#00adb4] font-mono">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>

        <div className="mt-6 text-xs border-t border-[#393d46] pt-4">
          <div className="grid grid-cols-4 gap-y-1 text-sm">
            <div className="text-[#00adb4] col-span-1">OS:</div>
            <div className="col-span-3 text-[#e0e0e0]">LinxOS v0.10.0</div>

            <div className="text-[#00adb4] col-span-1">Memory:</div>
            <div className="col-span-3 text-[#e0e0e0]">
              {Math.floor(256 * (progress / 100))}MB / 512MB
            </div>

            <div className="text-[#00adb4] col-span-1">CPU:</div>
            <div className="col-span-3 text-[#e0e0e0]">
              {Math.floor(25 + progress / 4)}%
            </div>

            <div className="text-[#00adb4] col-span-1">Processes:</div>
            <div className="col-span-3 text-[#e0e0e0]">
              {16 + Math.floor(progress / 10)}
            </div>

            <div className="text-[#00adb4] col-span-1">Uptime:</div>
            <div className="col-span-3 text-[#e0e0e0]">
              {Math.floor(progress / 10)}s
            </div>

            <div className="text-[#00adb4] col-span-1">Network:</div>
            <div className="col-span-3 text-[#e0e0e0]">
              {progress > 30 ? "Connected" : "Connecting..."}
            </div>
          </div>
        </div>

        <div className="mt-6 p-2 border border-[#393d46] bg-[#0c1219]">
          <div className={progress >= 90 ? "text-[#00adb4]" : "text-[#e0e0e0]"}>
            <span className="mr-2">›</span>
            {progress < 30
              ? "Initializing system components..."
              : progress < 60
              ? "Loading application modules..."
              : progress < 90
              ? "Finalizing system setup..."
              : "System is ready. Launching application..."}
          </div>
        </div>

        <div className="mt-6 pt-2 border-t border-[#393d46]">
          <div className="flex space-x-1">
            {[
              "#060a10",
              "#202832",
              "#393d46",
              "#188d93",
              "#00adb4",
              "#107f84",
            ].map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 border border-[#393d46] transition-all duration-200"
                style={{
                  backgroundColor: color,
                  opacity: progress > i * 15 ? 1 : 0.3,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes flicker {
          0% {
            opacity: 0;
            transform: translateY(-2px);
          }
          15% {
            opacity: 0.4;
            transform: translateY(-1px);
          }
          30% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;