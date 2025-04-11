"use client";
import React, { useState, useEffect, useRef } from "react";

const TerminalCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => setIsVisible(true), 500);

    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const elements = document.elementsFromPoint(position.x, position.y);

      const targetElements = elements.filter(
        (el) => !cursorRef.current?.contains(el) && el !== cursorRef.current
      );

      const isHoveringClickable = targetElements.some(
        (el) =>
          el.tagName === "A" ||
          el.tagName === "BUTTON" ||
          el.getAttribute("role") === "button" ||
          el.tagName === "INPUT" ||
          el.tagName === "SELECT" ||
          el.tagName === "TEXTAREA" ||
          el.tagName === "LABEL" ||
          (el.getAttribute("tabindex") &&
            el.getAttribute("tabindex") !== "-1") ||
          window.getComputedStyle(el).cursor === "pointer"
      );

      setIsPointer(isHoveringClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mousemove", updateCursorType);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearTimeout(visibilityTimeout);
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mousemove", updateCursorType);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [position.x, position.y]);

  return (
    <>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={cursorRef}
        className={`hidden md:block fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className={`relative ${isClicking ? "scale-75" : "scale-100"}`}
          style={{
            transition: "transform 0.1s ease",
          }}
        >
          <div
            className={`absolute rounded-full ${
              isPointer
                ? "bg-transparent border border-[#00adb4]"
                : "bg-[#00adb4]"
            }`}
            style={{
              width: isPointer ? "24px" : "8px",
              height: isPointer ? "24px" : "8px",
              opacity: isPointer ? 0.8 : 0.8,
              transform: `translate(-50%, -50%)`,
              boxShadow: "0 0 10px rgba(0, 173, 180, 0.4)",
              transition:
                "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
            }}
          ></div>

          {isPointer && (
            <div
              className="absolute bg-[#00adb4] rounded-full"
              style={{
                width: "4px",
                height: "4px",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 6px rgba(0, 173, 180, 0.8)",
              }}
            ></div>
          )}

          <div
            className="absolute rounded-full bg-[#00adb4]"
            style={{
              width: "4px",
              height: "4px",
              transform: "translate(-50%, -50%) translate(-10px, -10px)",
              opacity: 0.2,
              transition: "opacity 0.3s ease",
            }}
          ></div>
          <div
            className="absolute rounded-full bg-[#00adb4]"
            style={{
              width: "3px",
              height: "3px",
              transform: "translate(-50%, -50%) translate(-15px, -15px)",
              opacity: 0.1,
              transition: "opacity 0.3s ease",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TerminalCursor;
