"use client";
import React, { useState, useEffect, useRef } from "react";

const SoftCursor: React.FC = () => {
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
        className={`fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          willChange: "transform",
          zIndex: 10000,
        }}
      >
        <div
          className={`relative ${isClicking ? "scale-75" : "scale-100"}`}
          style={{
            transition: "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            className={`absolute rounded-full ${
              isPointer ? "scale-100" : "scale-0"
            } bg-gradient-to-r from-[#e39fc2] to-[#b4688f]`}
            style={{
              width: "42px",
              height: "42px",
              transform: "translate(-50%, -50%)",
              opacity: 0.15,
              transition:
                "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, scale 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          ></div>

          <div
            className={`absolute rounded-full ${
              isPointer
                ? "bg-transparent border-2 border-[#e39fc2]"
                : "bg-[#e39fc2]"
            }`}
            style={{
              width: isPointer ? "32px" : "10px",
              height: isPointer ? "32px" : "10px",
              opacity: isPointer ? 0.8 : 0.7,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 15px rgba(227, 159, 194, 0.3)",
              transition:
                "width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease, opacity 0.3s ease",
            }}
          ></div>

          {isPointer && (
            <div
              className="absolute rounded-full"
              style={{
                width: "6px",
                height: "6px",
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(to right, #e39fc2, #b4688f)",
                boxShadow: "0 0 8px rgba(227, 159, 194, 0.6)",
              }}
            ></div>
          )}

          {isClicking && (
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: isPointer ? "32px" : "10px",
                height: isPointer ? "32px" : "10px",
                transform: "translate(-50%, -50%)",
                border: "1px solid #e39fc2",
                opacity: 0.6,
                animationDuration: "0.8s",
              }}
            ></div>
          )}

          <div
            className="absolute rounded-full bg-[#e39fc2]"
            style={{
              width: "3px",
              height: "3px",
              transform: "translate(-50%, -50%) translate(15px, 8px)",
              opacity: 0.6,
            }}
          ></div>
          <div
            className="absolute rounded-full bg-[#e39fc2]"
            style={{
              width: "2px",
              height: "2px",
              transform: "translate(-50%, -50%) translate(-10px, 12px)",
              opacity: 0.4,
            }}
          ></div>
          <div
            className="absolute rounded-full bg-[#b4688f]"
            style={{
              width: "2px",
              height: "2px",
              transform: "translate(-50%, -50%) translate(12px, -10px)",
              opacity: 0.4,
            }}
          ></div>

          {isPointer && (
            <div
              className="absolute"
              style={{
                transform: "translate(-50%, -50%) rotate(45deg)",
                opacity: 0.8,
              }}
            >
              <span
                className="block w-5 h-0.5 absolute bg-[#e39fc2]"
                style={{
                  boxShadow: "0 0 5px rgba(227, 159, 194, 0.8)",
                  animation: "sparkle 2s infinite",
                  top: "0px",
                  left: "-10px",
                }}
              ></span>
              <span
                className="block w-0.5 h-5 absolute bg-[#e39fc2]"
                style={{
                  boxShadow: "0 0 5px rgba(227, 159, 194, 0.8)",
                  animation: "sparkle 2s infinite 0.5s",
                  top: "-10px",
                  left: "0px",
                }}
              ></span>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
};

export default SoftCursor;
