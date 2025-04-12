import React, { useState, useEffect, useMemo } from "react";
import { useUser } from "@/context/UserContext";
import { usersData } from "@/data/UsersData";

const Shuttler: React.FC = () => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const { activeUser, themeStyle } = useUser();
  const username = usersData[activeUser].alias;

  const welcomePhrases = useMemo(() => {
    if (themeStyle === "soft") {
      return [
        `Welcome to my creative space, ${username} ✨`,
        `So happy you're here, ${username}! Let's explore together 💕`,
        `Hi ${username}! Thanks for visiting my portfolio ✨`,
        `Welcome to my digital garden, ${username} 🌸`,
      ];
    } else {
      return [
        `welcome aboard, ${username}.`,
        `rejaka`,
        `abimanyu`,
        `susanto`,
        `rejaka abimanyu susanto`,
        `welcome, ${username}.`,
        `web developer`,
        `programmer`,
        `coder`,
      ];
    }
  }, [username, themeStyle]);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(true);
    setCurrentPhraseIndex(0);
  }, [username, themeStyle]);

  useEffect(() => {
    if (themeStyle === "terminal") {
      let timer: ReturnType<typeof setTimeout>;

      if (isTyping) {
        if (displayText.length < welcomePhrases[currentPhraseIndex].length) {
          timer = setTimeout(() => {
            setDisplayText(
              welcomePhrases[currentPhraseIndex].slice(
                0,
                displayText.length + 1
              )
            );
          }, Math.random() * 50 + 50);
        } else {
          timer = setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      } else {
        if (displayText.length > 0) {
          timer = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, 30);
        } else {
          setCurrentPhraseIndex(
            (prevIndex) => (prevIndex + 1) % welcomePhrases.length
          );
          setIsTyping(true);
        }
      }

      return () => clearTimeout(timer);
    } else {
      setDisplayText(welcomePhrases[0]);
    }
  }, [displayText, isTyping, currentPhraseIndex, welcomePhrases, themeStyle]);

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono theme-bg-primary theme-text-primary border theme-border p-3 w-full mb-3">
        <div className="flex items-center">
          <span className="theme-accent-primary mr-2 text-lg">›</span>
          <div className="text-base">
            {displayText}
            <span
              className={`inline-block w-2 h-4 theme-accent-bg-primary ml-0.5 ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            ></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg-primary theme-text-primary p-4 w-full mb-3 rounded-2xl shadow-md soft-card">
      <div className="flex flex-col items-center text-center">
        <div className="mb-2 text-[#c4b2c3] font-medium text-sm">
          Welcome Message
        </div>
        <div className="text-lg font-medium welcome-highlight">
          {welcomePhrases[0]}
        </div>
      </div>
    </div>
  );
};

export default Shuttler;
