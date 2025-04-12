import React from "react";
import Image from "next/image";
import { useUser, UserAlias } from "@/context/UserContext";

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
  onionAddress,
}) => {
  const { activeUser, setActiveUser, themeStyle } = useUser();

  const handleUserChange = (user: UserAlias) => {
    setActiveUser(user);
  };

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono theme-bg-primary theme-text-primary p-4 rounded-none border theme-border h-full flex flex-col">
        <div className="flex flex-col items-center md:items-start flex-grow">
          <div className="mb-4 relative">
            {profileImage ? (
              <div className="w-24 h-24 md:w-28 md:h-28 border-2 border-[#107f84] overflow-hidden">
                <Image
                  src={profileImage}
                  alt={fullName}
                  width={112}
                  height={112}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 border-2 border-[#107f84] bg-[#202832] flex items-center justify-center">
                <div className="text-[#00adb4] text-3xl">
                  {fullName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
              </div>
            )}
          </div>

          <div className="text-center md:text-left mb-3">
            <h1 className="theme-accent-primary text-xl font-bold">
              Rejaka Abimanyu Susanto
            </h1>
            <div className="flex items-center mt-1">
              <span className="theme-text-secondary">alias</span>
              <span className="ml-2 px-2 py-0.5 bg-[#202832] border border-[#107f84] theme-accent-primary">
                {alias}
              </span>
            </div>
          </div>

          <div className="mt-2 mb-4 w-full grid grid-cols-3 gap-1">
            <button
              onClick={() => handleUserChange("abim")}
              className={`px-2 py-1 text-xs border ${
                activeUser === "abim"
                  ? "bg-[#202832] border-[#00adb4] text-[#00adb4]"
                  : "border-[#393d46] text-[#e0e0e0] hover:border-[#00adb4]"
              }`}
            >
              abim
            </button>
            <button
              onClick={() => handleUserChange("rez3x")}
              className={`px-2 py-1 text-xs border ${
                activeUser === "rez3x"
                  ? "bg-[#202832] border-[#00adb4] text-[#00adb4]"
                  : "border-[#393d46] text-[#e0e0e0] hover:border-[#00adb4]"
              }`}
            >
              rez3x
            </button>
            <button
              onClick={() => handleUserChange("xiannyaa")}
              className={`px-2 py-1 text-xs border ${
                activeUser === "xiannyaa"
                  ? "bg-[#202832] border-[#00adb4] text-[#00adb4]"
                  : "border-[#393d46] text-[#e0e0e0] hover:border-[#00adb4]"
              }`}
            >
              xiannyaa
            </button>
          </div>

          {onionAddress && (
            <div className="mt-auto pt-3 w-full border-t theme-border">
              <div className="flex items-center">
                <div className="text-xs theme-accent-primary mr-2">TOR:</div>
                <code className="text-xs bg-[#202832] px-2 py-1 border theme-border theme-text-primary font-mono break-all">
                  {onionAddress}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg-primary theme-text-primary p-6 rounded-2xl shadow-md h-full flex flex-col items-center soft-card">
      <div className="flex flex-col items-center flex-grow text-center">
        <div className="mb-5 relative">
          {profileImage ? (
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#574655] shadow-md overflow-hidden">
              <Image
                src={profileImage}
                alt={fullName}
                width={144}
                height={144}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-[#574655] shadow-md theme-bg-secondary flex items-center justify-center">
              <div className="theme-accent-primary text-4xl">
                {fullName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
            </div>
          )}
        </div>

        <div className="text-center mb-4">
          <h1 className="theme-accent-primary text-xl font-medium mb-1">
            Rejaka Abimanyu Susanto
          </h1>
          <div className="inline-block px-3 py-1 rounded-full theme-bg-secondary theme-text-primary text-sm font-light">
            @{alias}
          </div>
        </div>

        <div className="text-sm theme-text-secondary mb-6 max-w-xs">
          Creative writer, artist, and storyteller. Blending technology with art
          to create unique digital narratives.
        </div>

        <div className="mt-auto mb-4 w-full flex justify-center gap-2">
          <button
            onClick={() => handleUserChange("abim")}
            className={`px-4 py-1.5 text-xs rounded-full transition-all ${
              activeUser === "abim"
                ? "bg-[#b4688f] text-white shadow-md"
                : "bg-[#463343] text-[#c4b2c3] hover:bg-[#574655]"
            }`}
          >
            abim
          </button>
          <button
            onClick={() => handleUserChange("rez3x")}
            className={`px-4 py-1.5 text-xs rounded-full transition-all ${
              activeUser === "rez3x"
                ? "bg-[#b4688f] text-white shadow-md"
                : "bg-[#463343] text-[#c4b2c3] hover:bg-[#574655]"
            }`}
          >
            rez3x
          </button>
          <button
            onClick={() => handleUserChange("xiannyaa")}
            className={`px-4 py-1.5 text-xs rounded-full transition-all ${
              activeUser === "xiannyaa"
                ? "bg-[#e39fc2] text-[#2a1e29] shadow-md font-medium"
                : "bg-[#463343] text-[#c4b2c3] hover:bg-[#574655]"
            }`}
          >
            xiannyaa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
