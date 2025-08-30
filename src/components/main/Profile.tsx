import React from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

interface ProfileProps {
  fullName: string;
  alias: string;
  profileImage?: string;
  onionAddress?: string;
}

const Profile: React.FC<ProfileProps> = ({
  fullName,
  alias,
  profileImage,
}) => {
  const { themeStyle } = useUser();

  const environment = process.env.NEXT_PUBLIC_WEB_ENVIRONMENT || "Clearnet";
  const clearnetDomain = process.env.NEXT_PUBLIC_CLEARNET_DOMAIN || "rejaka.id";
  const hiddenDomain = process.env.NEXT_PUBLIC_HIDDEN_DOMAIN || "adsadsad.onion";

  const addressToShow = environment === "Clearnet" ? hiddenDomain : clearnetDomain;
  const addressLabel = environment === "Clearnet" ? "TOR" : "CLEARNET";

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono theme-bg-primary theme-text-primary p-4 rounded-none border theme-border h-full flex flex-col">
        <div className="flex flex-col items-center md:items-start flex-grow">
          <div className="mb-3 relative">
            {profileImage ? (
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#107f84] overflow-hidden">
                <Image
                  src={profileImage}
                  alt={fullName}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#107f84] bg-[#202832] flex items-center justify-center">
                <div className="text-[#00adb4] text-xl">
                  {fullName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
              </div>
            )}
          </div>

          <div className="text-center md:text-left mb-3 w-full">
            <h1 className="theme-accent-primary text-base font-bold mb-1">
              Rejaka Abimanyu Susanto
            </h1>
            <div className="flex items-center justify-center md:justify-start mb-2">
              <span className="theme-text-secondary text-xs">alias</span>
              <span className="ml-2 px-2 py-0.5 bg-[#202832] border border-[#107f84] theme-accent-primary text-xs">
                {alias}
              </span>
            </div>
            
            <div className="text-xs theme-text-secondary leading-relaxed">
              <p className="theme-accent-primary font-semibold mb-1">Web Developer | Programmer</p>
              <p className="text-[#8b9cbe]">SIJA Student • Slaviors CTO</p>
            </div>
          </div>

          <div className="w-full mb-3 border-t theme-border pt-2">
            <div className="flex items-center mb-2">
              <span className="text-[#00adb4] mr-2">#</span>
              <h3 className="text-[#00adb4] font-bold text-xs">Tech Stack</h3>
            </div>
            <div className="flex flex-wrap gap-1 pl-4">
              {["Next.js", "Express", "MongoDB", "TailwindCSS"].map((tech) => (
                <span
                  key={tech}
                  className="px-1.5 py-0.5 bg-[#202832] text-[#e0e0e0] border border-[#393d46] text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="w-full mt-auto border-t theme-border pt-2">
            <div className="flex items-center">
              <div className="text-xs theme-accent-primary mr-2">{addressLabel}:</div>
              <code className="text-xs bg-[#202832] px-2 py-1 border theme-border theme-text-primary font-mono break-all">
                {addressToShow}
              </code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg-primary theme-text-primary p-4 rounded-2xl shadow-md h-full flex flex-col items-center soft-card">
      <div className="flex flex-col items-center flex-grow text-center w-full">
        <div className="mb-3 relative">
          {profileImage ? (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#574655] shadow-md overflow-hidden">
              <Image
                src={profileImage}
                alt={fullName}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#574655] shadow-md theme-bg-secondary flex items-center justify-center">
              <div className="theme-accent-primary text-2xl">
                {fullName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-3 w-full">
          <h1 className="theme-accent-primary text-base font-medium mb-1">
            Rejaka Abimanyu Susanto
          </h1>
          <div className="inline-block px-2.5 py-0.5 rounded-full theme-bg-secondary theme-text-primary text-xs font-light mb-2">
            @{alias}
          </div>
          
          <div className="text-xs theme-text-secondary leading-relaxed max-w-xs mx-auto">
            <p className="text-[#e39fc2] font-medium mb-1">Full Stack Web Developer</p>
            <p className="mb-1">SIJA Student • Slaviors CTO</p>
            <p className="text-xs opacity-75">Award-winning developer</p>
          </div>
        </div>

        <div className="w-full mb-3">
          <h3 className="text-[#e39fc2] font-medium text-xs mb-2">Core Stack</h3>
          <div className="flex flex-wrap justify-center gap-1">
            {["Next.js", "TypeScript", "MongoDB", "React"].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-[#463343] text-[#e39fc2] text-xs rounded-full shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full mb-3 p-2.5 bg-[#382736] rounded-lg border border-[#574655]">
          <h3 className="text-[#e39fc2] font-medium text-xs mb-1 text-center">Latest Achievement</h3>
          <div className="text-xs text-[#f0e6ef] text-center">
            <div className="font-medium">Silogy Expo Finalist</div>
            <div className="text-[#c4b2c3] text-xs">National • 2025</div>
          </div>
        </div>

        <div className="w-full mt-auto">
          <div className="text-xs text-[#c4b2c3] space-y-0.5 mb-3">
            <div className="flex items-center justify-center">
              <span className="mr-2">✉</span>
              <span>abim@rejaka.id</span>
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-2">📍</span>
              <span>Yogyakarta, ID</span>
            </div>
          </div>

          <div className="w-full border-t border-[#574655] pt-2">
            <div className="text-xs text-center">
              <div className="text-[#e39fc2] font-medium mb-1">{addressLabel} Address</div>
              <code className="text-xs bg-[#382736] px-2 py-1 rounded border border-[#574655] text-[#f0e6ef] break-all">
                {addressToShow}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;