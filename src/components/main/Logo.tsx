import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { usersData } from "@/data/UsersData";

interface LogoProps {
  title: string;
  location: string;
  email: string;
  website: string;
  skills: string[];
  os: string;
  kernelVersion?: string;
  uptime?: string;
}

const Logo: React.FC<LogoProps> = ({
  title,
  location,
  email,
  skills,
  os,
  kernelVersion = "5.15.0-portfolio-custom",
}) => {
  const { activeUser } = useUser();
  const username = usersData[activeUser].alias;

  const [rotationY, setRotationY] = useState(0);
  const [uptime, setUptime] = useState("0s");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [startTime] = useState(Date.now());

  const environment = process.env.NEXT_PUBLIC_WEB_ENVIRONMENT || "Clearnet";
  const clearnetDomain = process.env.NEXT_PUBLIC_CLEARNET_DOMAIN || "rejaka.id";
  const hiddenDomain = process.env.NEXT_PUBLIC_HIDDEN_DOMAIN || "adsadsad.onion";

  const websiteToShow = environment === "Clearnet" ? clearnetDomain : hiddenDomain;

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

  useEffect(() => {
    const updateTimes = () => {
      const now = Date.now();
      const elapsedMs = now - startTime;

      const seconds = Math.floor(elapsedMs / 1000) % 60;
      const minutes = Math.floor(elapsedMs / (1000 * 60)) % 60;
      const hours = Math.floor(elapsedMs / (1000 * 60 * 60)) % 24;
      const days = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

      let uptimeString = "";
      if (days > 0) uptimeString += `${days}d `;
      if (hours > 0 || days > 0) uptimeString += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) uptimeString += `${minutes}m `;
      uptimeString += `${seconds}s`;

      setUptime(uptimeString);

      const date = new Date();
      const timeString = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    updateTimes();

    const intervalId = setInterval(updateTimes, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return (
    <div className="hidden md:block font-mono bg-[#060a10] text-[#e0e0e0] p-4 rounded-none border border-[#393d46] h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        <div className="md:w-1/3">
          <div className="ascii-container relative h-full">
            <div className="text-center select-none">
              <pre
                className="ascii-logo text-[#00adb4] text-xs whitespace-pre leading-tight inline-block"
                style={{
                  transform: `perspective(800px) rotateY(${
                    rotationY % 360
                  }deg)`,
                  transition: "none",
                }}
              >
                {customAsciiArt}
              </pre>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="mb-2">
            <span className="text-[#00adb4] font-bold">{username}</span>
            <span className="text-[#393d46]">@</span>
            <span className="text-[#188d93]">linxos</span>
          </div>

          <div className="border-t border-[#393d46] pt-2">
            <div className="grid grid-cols-4 gap-y-1 text-sm">
              <div className="text-[#00adb4] col-span-1">OS:</div>
              <div className="col-span-3 text-[#e0e0e0]">{os}</div>

              <div className="text-[#00adb4] col-span-1">Host:</div>
              <div className="col-span-3 text-[#e0e0e0]">{location}</div>

              <div className="text-[#00adb4] col-span-1">Kernel:</div>
              <div className="col-span-3 text-[#e0e0e0]">{kernelVersion}</div>

              <div className="text-[#00adb4] col-span-1">Uptime:</div>
              <div className="col-span-3 text-[#e0e0e0]">{uptime}</div>

              <div className="text-[#00adb4] col-span-1">Time:</div>
              <div className="col-span-3 text-[#e0e0e0]">{currentTime}</div>

              <div className="text-[#00adb4] col-span-1">Shell:</div>
              <div className="col-span-3 text-[#e0e0e0]">{title}</div>

              <div className="text-[#00adb4] col-span-1">Terminal:</div>
              <div className="col-span-3 text-[#e0e0e0]">{email}</div>

              {environment === "Clearnet" && (
                <>
                  <div className="text-[#00adb4] col-span-1">Web:</div>
                  <div className="col-span-3 text-[#e0e0e0]">{websiteToShow}</div>
                </>
              )}

              <div className="text-[#00adb4] col-span-1">Environment:</div>
              <div className="col-span-3 text-[#e0e0e0]">
                <span className={`px-1.5 py-0.5 text-xs ${
                  environment === "Clearnet" 
                    ? "bg-[#1a4d1a] text-[#4ade80] border border-[#22c55e]" 
                    : "bg-[#4d1a1a] text-[#f87171] border border-[#ef4444]"
                }`}>
                  {environment}
                </span>
              </div>

              <div className="text-[#00adb4] col-span-1">Packages:</div>
              <div className="col-span-3 flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-1.5 py-0.5 bg-[#060a10] text-[#e0e0e0] border border-[#107f84] text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2 border-t border-[#393d46]">
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
    </div>
  );
};

export default Logo;