"use client";
import React, { useState, useEffect } from "react";

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    let animationId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      setRotationY((prevY) => prevY + deltaTime * 0.05);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 1, 100);
      });
    }, 50);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    const bootLineInterval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= bootLines.length - 1) {
          clearInterval(bootLineInterval);
          return bootLines.length - 1;
        }
        return prev + 1;
      });
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(cursorInterval);
      clearInterval(bootLineInterval);
    };
  }, []);

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

  const bootLines = [
    "BIOS initialized, starting boot sequence...",
    "Loading kernel...",
    "Mounting root filesystem...",
    "Starting system services...",
    "Initializing network interfaces...",
    "Starting web server...",
    "Loading OS components...",
    "Checking dependencies...",
    "Optimizing assets...",
    "Establishing connection...",
    "Ready to launch!",
  ];

  return (
    <div className="fixed inset-0 bg-[#060a10] z-50 font-mono text-[#e0e0e0] p-4 overflow-auto flex flex-col">
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
          <div className="text-xs mb-2 text-[#00adb4]">LiNXOS OS v0.10.0</div>
          <div className="text-xs text-[#393d46] mb-4">
            System initializing...
          </div>
        </div>

        <div className="space-y-1.5 mb-6 border border-[#393d46] bg-[#0c1219] p-3">
          {bootLines.slice(0, currentLine + 1).map((line, index) => (
            <div key={index} className="flex">
              <span className="text-[#00adb4] mr-2">[boot]</span>
              <span className="text-[#e0e0e0]">{line}</span>
              {index === currentLine && (
                <span
                  className={`ml-1 text-[#00adb4] ${
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
          <div className="border border-[#393d46] w-full">
            <div
              className="bg-[#00adb4] h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-[#e0e0e0]">Loading OS...</span>
            <span className="text-[#00adb4]">{progress}%</span>
          </div>
        </div>

        <div className="mt-6 text-xs border-t border-[#393d46] pt-4">
          <div className="grid grid-cols-4 gap-y-1 text-sm">
            <div className="text-[#00adb4] col-span-1">OS:</div>
            <div className="col-span-3 text-[#e0e0e0]">LinxOS 0.10.0</div>

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
          </div>
        </div>

        <div className="mt-6 p-2 border border-[#393d46] bg-[#0c1219]">
          <div className={progress >= 90 ? "text-[#00adb4]" : "text-[#e0e0e0]"}>
            <span className="mr-2">›</span>
            {progress >= 90
              ? "System is ready. Launching application..."
              : "Please wait while the system initializes..."}
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
                className="w-6 h-6 border border-[#393d46]"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
