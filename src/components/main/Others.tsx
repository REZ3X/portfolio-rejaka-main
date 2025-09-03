"use client";
import React from "react";
import { useUser } from "@/context/UserContext";

interface OthersItem {
  label: string;
  description: string;
  url: string;
  icon: string;
  external?: boolean;
  modal?: string;
  mobileOnly?: boolean;
}

const BASE_OTHERS_DATA: OthersItem[] = [
  {
    label: "Resume",
    description: "View my professional resume and CV",
    url: "/resume",
    icon: "📄",
    external: true,
  },
  {
    label: "Guestbook",
    description: "Sign our guestbook and leave a message",
    url: "/guestbook",
    icon: "✍️",
    modal: "guestbook",
  },
  {
    label: "Links",
    description: "All my social media and external links",
    url: "https://links.rejaka.id",
    icon: "🔗",
    external: true,
  },
  {
    label: "Server Status",
    description: "Time-Shifted monitoring of rejaka.id infrastructure",
    url: "/uptime",
    icon: "📊",
    external: true,
  },
];

const MOBILE_ONLY_DATA: OthersItem[] = [
  {
    label: "Privacy Policy",
    description: "Read the privacy policy and data handling practices",
    url: "/privacy-policy",
    icon: "🔒",
    external: true,
    mobileOnly: true,
  },
];

const Others: React.FC = () => {
  const { themeStyle } = useUser();

  const [othersData, setOthersData] = React.useState(BASE_OTHERS_DATA);

  React.useEffect(() => {
    const updateData = () => {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        setOthersData([...BASE_OTHERS_DATA, ...MOBILE_ONLY_DATA]);
      } else {
        setOthersData(BASE_OTHERS_DATA);
      }
    };

    updateData();

    window.addEventListener("resize", updateData);
    return () => window.removeEventListener("resize", updateData);
  }, []);

  const handleItemClick = (item: OthersItem) => {
    if (item.modal) {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("modal", item.modal);
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event("popstate"));
      }
    } else if (item.external) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.url;
    }
  };

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono bg-[#060a10] text-[#e0e0e0] rounded-none border border-[#393d46] h-full flex flex-col">
        <div className="p-2.5 border-b border-[#393d46] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <span className="text-[#00adb4] font-bold text-sm">Others</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-[#393d46] rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-[#393d46] rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-[#393d46] rounded-full"></div>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-3 overflow-auto">
          {othersData.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(item)}
              className={`w-full text-left border border-[#393d46] p-3 hover:border-[#00adb4] hover:bg-[#0a1017] transition-all duration-200 group ${
                item.mobileOnly ? "lg:hidden" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-lg flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[#00adb4] font-bold text-sm group-hover:text-[#4dd0e1]">
                      {item.label}
                    </h3>
                    <span className="text-[#8b9cbe] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.external ? "↗" : "→"}
                    </span>
                  </div>
                  <p className="text-xs text-[#8b9cbe] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}

          {othersData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-2xl mb-2 opacity-30">📂</div>
              <div className="text-xs text-[#8b9cbe]">
                No additional pages available
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-[#393d46] p-2.5 text-center">
          <div className="text-[10px] text-[#8b9cbe]">
            {othersData.length} item{othersData.length !== 1 ? "s" : ""}{" "}
            available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg-primary border theme-border rounded-2xl h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b theme-border">
        <div className="flex items-center">
          <div className="w-3 h-3 theme-accent-bg-primary mr-2 rounded-full"></div>
          <h2 className="theme-accent-primary text-xl font-bold">Others</h2>
        </div>
        <p className="text-sm theme-text-secondary mt-1">
          Additional resources and pages
        </p>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-auto">
        {othersData.map((item, index) => (
          <button
            key={index}
            onClick={() => handleItemClick(item)}
            className={`w-full text-left border theme-border rounded-xl p-4 hover:border-[#e39fc2] hover:shadow-md transition-all duration-200 group bg-[#382736] hover:bg-[#463343] ${
              item.mobileOnly ? "lg:hidden" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="text-2xl flex-shrink-0 mt-1">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="theme-accent-primary font-medium text-lg group-hover:text-[#f4c1d8]">
                    {item.label}
                  </h3>
                  <span className="text-[#c4b2c3] opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                    {item.external ? "↗" : "→"}
                  </span>
                </div>
                <p className="text-sm text-[#c4b2c3] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}

        {othersData.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-4xl mb-3 opacity-30">📂</div>
            <div className="text-sm theme-text-secondary">
              No additional pages available yet
            </div>
          </div>
        )}
      </div>

      <div className="border-t theme-border p-3 text-center">
        <div className="text-xs theme-text-secondary">
          {othersData.length} resource{othersData.length !== 1 ? "s" : ""}{" "}
          available
        </div>
      </div>
    </div>
  );
};

export default Others;
