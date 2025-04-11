"use client";
import React, { useState, useEffect, useRef } from "react";
import { UserAlias, useUser } from "@/context/UserContext";
import { processCommand } from "@/utils/CommandProcessor";

interface TerminalProps {
  openModal: (modal: string) => void;
}

const blinkingCursorStyle = `
  @keyframes blink {
    0%, 49% {
      opacity: 1;
    }
    50%, 100% {
      opacity: 0;
    }
  }

  .terminal-cursor-wrapper {
    position: relative;
    display: inline-block;
  }

  .terminal-cursor {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 8px; 
    background-color: #00adb4;
    animation: blink 1s step-end infinite;
  }

  .terminal-input {
    background-color: transparent;
    caret-color: transparent;
  }
`;

const Terminal: React.FC<TerminalProps> = ({ openModal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState("");
  const [output, setOutput] = useState<
    Array<{
      type: "command" | "output" | "error";
      content: string;
      isPrompt?: boolean;
    }>
  >([
    { type: "output", content: "█▓▒░ Welcome to LinxOS Terminal ░▒▓█" },
    { type: "output", content: 'Type "help" for available commands.' },
    { type: "command", content: "", isPrompt: true },
  ]);

  const { activeUser, setActiveUser, themeStyle } = useUser();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textMeasureRef = useRef<HTMLSpanElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const [terminalHeight, setTerminalHeight] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [charWidth, setCharWidth] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  useEffect(() => {
    if (textMeasureRef.current && isExpanded) {
      const testString = "XXXXX";
      textMeasureRef.current.textContent = testString;

      const width = textMeasureRef.current.getBoundingClientRect().width;
      const newCharWidth = width / testString.length;

      if (Math.abs(newCharWidth - charWidth) > 0.5) {
        setCharWidth(newCharWidth);
      }
    }
  }, [isExpanded]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setStartY(e.clientY);
    setStartHeight(terminalHeight);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaY = startY - e.clientY;
      const newHeight = Math.max(
        200,
        Math.min(window.innerHeight * 0.8, startHeight + deltaY)
      );
      setTerminalHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, startY, startHeight]);

  const handleCommand = (cmd: string) => {
    setOutput((prev) => prev.filter((line) => !line.isPrompt));

    const trimmedCmd = cmd.trim();

    if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, trimmedCmd]);
      setHistoryIndex(-1);

      setOutput((prev) => [
        ...prev,
        { type: "command", content: `${activeUser}@linxos:~$ ${trimmedCmd}` },
      ]);

      if (trimmedCmd.toLowerCase() === "exit") {
        setIsExpanded(false);
        setOutput((prev) => [
          ...prev,
          { type: "command", content: "", isPrompt: true },
        ]);
        setCurrentCommand("");
        setCursorPosition(0);
        return;
      }

      const result = processCommand(trimmedCmd, activeUser);

      if (!result.action) {
        setOutput((prev) => [
          ...prev,
          {
            type: result.success ? "output" : "error",
            content: result.message,
          },
        ]);
      } else {
        switch (result.action.type) {
          case "clearTerminal":
            setOutput([]);

            setOutput([{ type: "output", content: "Terminal cleared." }]);
            break;

          case "openModal":
            setIsModalOpen(true);
            openModal(result.action.payload);
            setOutput((prev) => [
              ...prev,
              {
                type: result.success ? "output" : "error",
                content: result.message,
              },
            ]);
            break;
          case "changeUser":
            if (
              result.action &&
              "payload" in result.action &&
              ["rez3x", "abim", "xiannyaa"].includes(
                result.action.payload as UserAlias
              )
            ) {
              setActiveUser(result.action.payload as UserAlias);
              setOutput((prev) => [
                ...prev,
                { type: "output", content: result.message },
              ]);
            } else {
              setOutput((prev) => [
                ...prev,
                {
                  type: "error",
                  content: `Invalid user: ${
                    result.action && "payload" in result.action
                      ? result.action.payload
                      : "undefined"
                  }`,
                },
              ]);
            }
            break;
        }
      }

      setOutput((prev) => [
        ...prev,
        { type: "command", content: "", isPrompt: true },
      ]);

      setCurrentCommand("");
      setCursorPosition(0);

      if (inputRef.current) {
        inputRef.current.selectionStart = 0;
        inputRef.current.selectionEnd = 0;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentCommand);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex + 1 < commandHistory.length
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(
          commandHistory[commandHistory.length - 1 - newIndex] || ""
        );

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.value.length;
            inputRef.current.selectionEnd = inputRef.current.value.length;
          }
        }, 0);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(
          commandHistory[commandHistory.length - 1 - newIndex] || ""
        );
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    if (inputRef.current && isExpanded) {
      inputRef.current.focus();
    }
  }, [output, isExpanded]);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const modalElements = document.querySelectorAll(
            '[class*="fixed inset-0 bg-black bg-opacity-80 z"]'
          );
          setIsModalOpen(modalElements.length > 0);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isExpanded) {
      const vh = window.innerHeight;
      const initialHeight = Math.floor(vh * 0.4);
      setTerminalHeight(initialHeight);
    }
  }, [isExpanded]);

  const handleTerminalContentClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (themeStyle !== "terminal") return null;

  return (
    <div
      className="terminal-wrapper"
      style={{ paddingBottom: isExpanded ? "35vh" : "0" }}
    >
      <style jsx global>
        {blinkingCursorStyle}
      </style>

      <span
        ref={textMeasureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          fontFamily: "monospace",
          fontSize: "0.875rem",
        }}
      ></span>

      <div
        className={`fixed bottom-0 left-0 right-0 w-full bg-[#060a10] border-t border-[#393d46] transition-all ${
          isResizing ? "" : "duration-300"
        }`}
        style={{
          height: isExpanded ? `${terminalHeight}px` : "40px",
          maxHeight: "80vh",
          willChange: "height",
          zIndex: isModalOpen ? 40 : 999,
        }}
      >
        {isExpanded && (
          <div
            ref={resizeHandleRef}
            className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize bg-transparent"
            onMouseDown={startResize}
            style={{ transform: "translateY(-50%)" }}
          />
        )}

        <div
          className="h-10 border-b border-[#393d46] flex items-center justify-between px-4 cursor-pointer bg-[#0a1520]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <span className="text-[#00adb4] mr-2">$</span>
            <span className="text-[#e0e0e0]">Terminal</span>
          </div>
          <div className="flex space-x-2">
            {isExpanded ? (
              <svg
                className="w-4 h-4 text-[#393d46]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-[#393d46]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            )}
          </div>
        </div>

        {isExpanded && (
          <div
            ref={terminalRef}
            className="h-[calc(100%-40px)] overflow-y-auto p-4 font-mono text-sm text-[#e0e0e0] whitespace-pre-wrap"
            onClick={handleTerminalContentClick}
          >
            {output.map((line, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  line.type === "error"
                    ? "text-red-400"
                    : line.type === "command"
                    ? "text-[#00adb4]"
                    : "text-[#e0e0e0]"
                }`}
              >
                {!line.isPrompt ? (
                  line.content
                ) : (
                  <div className="flex">
                    <span className="text-[#00adb4]">
                      {activeUser}@linxos:~$
                    </span>
                    <span className="ml-1 relative flex-1 terminal-cursor-wrapper">
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => {
                          setCurrentCommand(e.target.value);

                          setCursorPosition(e.target.selectionStart || 0);
                        }}
                        onKeyDown={(e) => {
                          handleKeyDown(e);

                          if (e.key !== "ArrowUp" && e.key !== "ArrowDown") {
                            setTimeout(() => {
                              if (e.target instanceof HTMLInputElement) {
                                setCursorPosition(e.target.selectionStart || 0);
                              }
                            }, 0);
                          }
                        }}
                        onMouseUp={(e) => {
                          if (e.target instanceof HTMLInputElement) {
                            setCursorPosition(e.target.selectionStart || 0);
                          }
                        }}
                        className="w-full bg-transparent border-none outline-none text-[#e0e0e0] font-mono text-sm terminal-input"
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                      />
                      {document.activeElement === inputRef.current && (
                        <div
                          className="terminal-cursor"
                          style={{
                            left:
                              currentCommand.length === 0
                                ? "0px"
                                : `${cursorPosition * charWidth}px`,
                            width: "10px",
                            backgroundColor: "#00adb4",
                          }}
                        />
                      )}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
