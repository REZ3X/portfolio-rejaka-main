"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import { processCommand } from "@/utils/CommandProcessor";

interface TerminalProps {
  openModal: (modal: string) => void;
}

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
  const [terminalHeight, setTerminalHeight] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

    if (themeStyle !== "terminal") return null;

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

            if (result.action?.type === "clearTerminal") {
        setOutput([]);
      } else if (result.action?.type === "openModal") {
        openModal(result.action.payload);
        setOutput((prev) => [
          ...prev,
          {
            type: result.success ? "output" : "error",
            content: result.message,
          },
        ]);
      } else if (result.action?.type === "changeUser") {
        setActiveUser(result.action.payload);
        setOutput((prev) => [
          ...prev,
          { type: "output", content: result.message },
        ]);
      } else {
                if (result.message) {
          setOutput((prev) => [
            ...prev,
            {
              type: result.success ? "output" : "error",
              content: result.message,
            },
          ]);
        }
      }
    }

        setOutput((prev) => [
      ...prev,
      { type: "command", content: "", isPrompt: true },
    ]);

        setCurrentCommand("");
    setCursorPosition(0);
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
    if (isExpanded) {
      const vh = window.innerHeight;
            const safeHeight = Math.floor(vh * 0.3);
      setTerminalHeight(safeHeight);
    }
  }, [isExpanded]);

    const handleTerminalContentClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
        <div
      className="terminal-wrapper"
      style={{ paddingBottom: isExpanded ? "35vh" : "0" }}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 w-full bg-[#060a10] border-t border-[#393d46] z-[9999] transition-all duration-300 ${
          isExpanded ? "h-[30vh]" : "h-10"
        }`}
        style={{
          maxHeight: isExpanded ? `${terminalHeight}px` : "40px",
          willChange: "height",
        }}
      >
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
                xmlns="http:              >
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
                xmlns="http:              >
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
                    <span className="ml-1 relative flex-1">
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full bg-transparent border-none outline-none text-[#e0e0e0] font-mono text-sm"
                        spellCheck={false}
                        autoComplete="off"
                        autoCapitalize="off"
                      />
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
