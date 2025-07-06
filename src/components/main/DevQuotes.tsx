"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

const devQuotes = [
  {
    text: "You can break a heart and still live like it never beat for them.",
    author: "Unknown",
  },
  {
    text: "I had to lose you to find pieces of myself I forgot existed.",
    author: "Unknown",
  },
  { text: "Some nights, silence is louder than goodbye.", author: "Unknown" },
  {
    text: "I hope you're happy, even if I’m not the reason anymore.",
    author: "Inspired by Olivia Rodrigo",
  },
  {
    text: "We were a song with no chorus—beautiful, but never meant to last.",
    author: "Unknown",
  },
  {
    text: "You don’t unlove someone. You just learn to live with the ache.",
    author: "Unknown",
  },
  {
    text: "If I could miss you less, I’d still choose to miss you a little.",
    author: "Unknown",
  },
  {
    text: "It’s strange how the ones who make you feel the most alive are the ones who leave you feeling the most lost.",
    author: "Unknown",
  },
  {
    text: "I waited for you in the quiet parts of the song, but you never came back.",
    author: "Inspired by Mitski",
  },
  {
    text: "We said forever like it was a promise, but we meant it like a hope.",
    author: "Unknown",
  },
  {
    text: "You can't keep people, only memories. And even those fade if you hold too tight.",
    author: "Unknown",
  },
  {
    text: "Love doesn't always mean staying. Sometimes it means letting go with grace.",
    author: "Unknown",
  },
  { text: "Even the moon lets go of the tide.", author: "Unknown" },
  {
    text: "Maybe we weren't meant to last, just to teach each other something before the fall.",
    author: "Unknown",
  },
  {
    text: "I still carry you, not in my hands—but in the places I feel most empty.",
    author: "Unknown",
  },
];

const DevQuotes: React.FC = () => {
  const { themeStyle } = useUser();
  const [currentQuote, setCurrentQuote] = useState(devQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomQuote =
        devQuotes[Math.floor(Math.random() * devQuotes.length)];
      setCurrentQuote(randomQuote);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(getNewQuote, 10000);
    return () => clearInterval(interval);
  }, []);

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] h-full flex flex-col">
        <div className="p-2.5 border-b border-[#393d46] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <span className="text-[#00adb4] font-bold text-sm">
              dev_quotes.sh
            </span>
          </div>
          <button
            onClick={getNewQuote}
            className="text-[#8b9cbe] hover:text-[#00adb4] text-xs"
          >
            [refresh]
          </button>
        </div>

        <div className="flex-1 p-3 flex flex-col justify-center">
          <div
            className={`transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="text-[#00adb4] text-xs mb-2">
              💡 Developer Wisdom:
            </div>
            <blockquote className="text-sm text-white leading-relaxed mb-3 italic">
              &quot;{currentQuote.text}&quot;
            </blockquote>
            <div className="text-[#8b9cbe] text-xs">
              — {currentQuote.author}
            </div>
          </div>
        </div>

        <div className="border-t border-[#393d46] p-2.5 text-center">
          <div className="text-[10px] text-[#8b9cbe]">
            Auto-refreshes every 10s
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-bg-primary border theme-border rounded-2xl h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b theme-border flex items-center justify-between">
        <div>
          <h2 className="theme-accent-primary text-xl font-bold">
            💭 Dev Quotes
          </h2>
          <p className="text-sm theme-text-secondary mt-1">
            Programming wisdom
          </p>
        </div>
        <button
          onClick={getNewQuote}
          className="px-3 py-1.5 bg-[#382736] theme-text-primary rounded-lg hover:bg-[#463343] transition-colors text-sm"
        >
          🔄
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-center">
        <div
          className={`transition-all duration-500 ${
            isAnimating
              ? "opacity-0 transform scale-95"
              : "opacity-100 transform scale-100"
          }`}
        >
          <div className="text-3xl mb-4 text-center">💡</div>
          <blockquote className="text-center theme-text-primary leading-relaxed mb-4 italic text-lg">
            &quot;{currentQuote.text}&quot;
          </blockquote>
          <div className="text-center theme-text-secondary">
            — {currentQuote.author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevQuotes;
