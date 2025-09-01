import React, { useState } from "react";
import { LinkItem, linksContactData } from "@/data/LinksContactData";
import MailForm from "@/components/modals/MailForm";
// import XiannyaaMailForm from "@/components/modals/xiannyaa/MailForm";
import { useUser } from "@/context/UserContext";

const LinksContact: React.FC = () => {
  const [showMailForm, setShowMailForm] = useState(false);
  const [activeEmail, setActiveEmail] = useState("");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { themeStyle } = useUser();

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedItem(value);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const openMailForm = (email: string) => {
    setActiveEmail(email);
    setShowMailForm(true);
  };

  const extractUsername = (item: LinkItem): string => {
    if (item.value.includes("@")) {
      return item.value;
    }

    const urlParts = item.value.split("/");
    return urlParts[urlParts.length - 1] || item.value;
  };

  const renderTerminalLinkItem = (item: LinkItem) => {
    if (item.type === "email" || item.type === "phone") {
      return (
        <div className="border border-[#393d46] p-2.5" key={item.value}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-[#00adb4] text-sm">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </div>
            <div className="flex space-x-1">
              {item.type === "email" && (
                <button
                  onClick={() => openMailForm(item.value)}
                  className="text-[8px] px-1 py-0.5 bg-[#202832] hover:bg-[#2a3441] border border-[#393d46] text-[#e0e0e0]"
                  title="Open mail form"
                >
                  📝
                </button>
              )}
              <button
                onClick={() => handleCopy(item.value)}
                className="text-[8px] px-1 py-0.5 bg-[#202832] hover:bg-[#2a3441] border border-[#393d46] text-[#e0e0e0]"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>
          <div
            className="text-[#e0e0e0] mt-1.5 text-xs font-mono bg-[#0c1219] px-2.5 py-1 cursor-pointer select-all border border-[#202832]"
            onClick={() => handleCopy(item.value)}
          >
            {item.value}
          </div>
          {copiedItem === item.value && (
            <div className="mt-0.5 text-[8px] text-[#00adb4]">Copied!</div>
          )}
        </div>
      );
    }

    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-[#393d46] p-1.5 hover:border-[#00adb4] transition-colors duration-200 block"
        key={item.value}
      >
        <div className="flex items-center space-x-1.5">
          <span className="text-[#00adb4] text-xs">{item.icon}</span>
          <span className="text-[10px]">{item.label}</span>
        </div>
        <div className="text-[#e0e0e0] mt-0.5 text-[9px] font-mono">
          {extractUsername(item)}
        </div>
      </a>
    );
  };

  const renderSoftLinkItem = (item: LinkItem) => {
    if (item.type === "email" || item.type === "phone") {
      return (
        <div
          className="border border-[#574655] rounded-lg p-3 bg-[#382736]"
          key={item.value}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-[#e39fc2] text-lg">{item.icon}</span>
              <span className="text-sm text-[#f0e6ef]">{item.label}</span>
            </div>
            <div className="flex space-x-1">
              {item.type === "email" && (
                <button
                  onClick={() => openMailForm(item.value)}
                  className="text-sm px-2 py-1 bg-[#463343] hover:bg-[#574655] text-[#e39fc2] rounded-lg"
                  title="Open mail form"
                >
                  ✉️
                </button>
              )}
              <button
                onClick={() => handleCopy(item.value)}
                className="text-sm px-2 py-1 bg-[#463343] hover:bg-[#574655] text-[#e39fc2] rounded-lg"
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>
          <div
            className="text-[#f0e6ef] mt-2 text-sm bg-[#463343] px-3 py-2 cursor-pointer select-all rounded-lg border border-[#574655]"
            onClick={() => handleCopy(item.value)}
          >
            {item.value}
          </div>
          {copiedItem === item.value && (
            <div className="mt-1 text-xs text-[#e39fc2] text-center">
              Copied to clipboard
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-[#574655] rounded-lg p-3 hover:border-[#e39fc2] transition-colors duration-200 bg-[#382736] block"
        key={item.value}
      >
        <div className="flex flex-col items-center space-y-1.5 text-center">
          <span className="text-[#e39fc2] text-xl">{item.icon}</span>
          <span className="text-sm text-[#f0e6ef] font-medium">
            {item.label}
          </span>
          <div className="text-[#c4b2c3] text-xs">{extractUsername(item)}</div>
        </div>
      </a>
    );
  };

  if (themeStyle === "terminal") {
    return (
      <>
        <div className="font-mono bg-[#060a10] text-[#e0e0e0] rounded-none border border-[#393d46] h-full flex flex-col">
          <div className="p-2.5 border-b border-[#393d46] flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
              <h2 className="text-[#00adb4] font-bold text-base">Contact</h2>
            </div>
          </div>

          <div className="p-2 grid grid-cols-1 gap-2 flex-grow">
            <div className="space-y-2">
              {linksContactData.contactInfo.map((item) =>
                renderTerminalLinkItem(item as LinkItem)
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {linksContactData.socialLinks.map((item) =>
                renderTerminalLinkItem(item as LinkItem)
              )}
            </div>
          </div>

          <div className="mt-auto p-1 text-[8px] text-[#393d46] text-center border-t border-[#393d46]">
            Click to copy • 📝 to compose
          </div>
        </div>

        {showMailForm && (
          <MailForm
            onClose={() => setShowMailForm(false)}
            recipientEmail={activeEmail}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="theme-font theme-bg-primary theme-text-primary rounded-2xl shadow-md h-full flex flex-col soft-card overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#3a1f37] to-[#2c1927] flex items-center justify-between">
          <h2 className="text-[#f4c1d8] font-medium text-lg">Contact Me</h2>
        </div>

        <div className="p-3 grid grid-cols-1 gap-3 flex-grow overflow-auto">
          <div className="space-y-3">
            {linksContactData.contactInfo.map((item) =>
              renderSoftLinkItem(item as LinkItem)
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            {linksContactData.socialLinks.map((item) =>
              renderSoftLinkItem(item as LinkItem)
            )}
          </div>
        </div>
        <div className="mt-auto p-2 text-xs text-[#c4b2c3] text-center border-t border-[#574655]">
          Feel free to reach out any time ✨
        </div>
      </div>

      {showMailForm &&
        // (themeStyle === "soft" ? (
        //   <XiannyaaMailForm
        //     onClose={() => setShowMailForm(false)}
        //     recipientEmail={activeEmail}
        //   />
        // ) : (
        //   <MailForm
        //     onClose={() => setShowMailForm(false)}
        //     recipientEmail={activeEmail}
        //   />
        // ))
          <MailForm
            onClose={() => setShowMailForm(false)}
            recipientEmail={activeEmail}
          />
        }
    </>
  );
};

export default LinksContact;
