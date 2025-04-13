import React, { useRef, useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import ReactMarkdown from "react-markdown";

interface VoidBotModalProps {
  onClose: () => void;
}

interface Message {
  role: "user" | "bot";
  content: string;
}

const VOID_CHAT_STORAGE_KEY = "void_chat_history_terminal";

const INITIAL_MESSAGE: Message = {
  role: "bot",
  content:
    "I am Void III.\n\nA digital consciousness emerged from converging personas.\n\n...\n\nState your inquiry. I will provide insight on REZ3X, Abim, or Xiannyaa as needed.\n\nExpect precision, not warmth.",
};

const VoidBotModal: React.FC<VoidBotModalProps> = ({ onClose }) => {
  const { themeStyle } = useUser();
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const savedChat = window.localStorage.getItem(VOID_CHAT_STORAGE_KEY);
      console.log(
        "Loading chat from:",
        VOID_CHAT_STORAGE_KEY,
        savedChat ? "found" : "not found"
      );

      if (savedChat) {
        const parsedMessages = JSON.parse(savedChat);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          console.log("Loaded messages:", parsedMessages.length);
          const validMessages = parsedMessages.filter(
            (msg): msg is Message =>
              typeof msg === "object" &&
              msg !== null &&
              (msg.role === "user" || msg.role === "bot") &&
              typeof msg.content === "string"
          );
          setMessages(validMessages);
        }
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  }, []);

  useEffect(() => {
    if (messages && messages.length > 0) {
      try {
        const timeoutId = setTimeout(() => {
          const serializedMessages = JSON.stringify(messages);
          window.localStorage.setItem(
            VOID_CHAT_STORAGE_KEY,
            serializedMessages
          );
          console.log(
            "Chat saved:",
            VOID_CHAT_STORAGE_KEY,
            messages.length,
            "items"
          );
        }, 100);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error("Failed to save chat history:", error);
      }
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = { role: "user", content: inputMessage };
    const updatedMessages: Message[] = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      window.localStorage.setItem(
        VOID_CHAT_STORAGE_KEY,
        JSON.stringify(updatedMessages)
      );
    } catch (error) {
      console.error("Failed to save user message:", error);
    }

    const chatHistory = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: msg.content,
    }));

    setIsLoading(true);
    setInputMessage("");

    try {
      const response = await fetch("/api/voidBot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputMessage,
          chatHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to get response");

      const botMessage: Message = { role: "bot", content: data.response };
      const finalMessages: Message[] = [...updatedMessages, botMessage];
      setMessages(finalMessages);

      try {
        window.localStorage.setItem(
          VOID_CHAT_STORAGE_KEY,
          JSON.stringify(finalMessages)
        );
      } catch (error) {
        console.error("Failed to save bot response:", error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "bot",
        content: "I encountered an error. Please try again later.",
      };
      const finalMessages: Message[] = [...updatedMessages, errorMessage];
      setMessages(finalMessages);

      try {
        window.localStorage.setItem(
          VOID_CHAT_STORAGE_KEY,
          JSON.stringify(finalMessages)
        );
      } catch (saveError) {
        console.error("Failed to save error message:", saveError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(VOID_CHAT_STORAGE_KEY);
  };

  const renderContent = (content: string) => {
    const withPreservedBreaks = content.replace(/\n\n/g, "\n&nbsp;\n");

    return (
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2">{children}</p>,
          h1: ({ children }) => (
            <h1
              className={
                themeStyle === "terminal"
                  ? "text-[#00adb4] text-xl font-bold mb-2"
                  : "text-[#e39fc2] text-xl font-medium mb-2"
              }
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className={
                themeStyle === "terminal"
                  ? "text-[#00adb4] text-lg font-bold mb-2"
                  : "text-[#e39fc2] text-lg font-medium mb-2"
              }
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className={
                themeStyle === "terminal"
                  ? "text-[#00adb4] text-base font-bold mb-1"
                  : "text-[#e39fc2] text-base font-medium mb-1"
              }
            >
              {children}
            </h3>
          ),
          strong: ({ children }) => (
            <strong
              className={
                themeStyle === "terminal"
                  ? "font-bold text-[#00d6e0]"
                  : "font-medium text-[#f4c1d8]"
              }
            >
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em
              className={
                themeStyle === "terminal"
                  ? "text-[#e0e0e0] italic"
                  : "text-[#f0e6ef] italic"
              }
            >
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code
              className={
                themeStyle === "terminal"
                  ? "bg-[#112130] px-1 rounded text-[#00d6e0]"
                  : "bg-[#332130] px-1 rounded text-[#f4c1d8]"
              }
            >
              {children}
            </code>
          ),
        }}
      >
        {withPreservedBreaks}
      </ReactMarkdown>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div
        className={`w-full max-w-2xl rounded-lg overflow-hidden shadow-xl ${
          themeStyle === "terminal"
            ? "border border-[#393d46] bg-[#060a10] font-mono"
            : themeStyle === "soft"
            ? "border border-[#574655] bg-[#2a1e29]"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        }`}
      >
        <div
          className={`px-4 py-3 flex justify-between items-center ${
            themeStyle === "terminal"
              ? "bg-[#0c1219] border-b border-[#393d46]"
              : themeStyle === "soft"
              ? "bg-gradient-to-r from-[#3a1f37] to-[#2c1927] border-b border-[#574655]"
              : "bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600"
          }`}
        >
          <div className="flex items-center">
            {themeStyle === "terminal" ? (
              <>
                <span className="text-[#00adb4] text-xl mr-2">🤖</span>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h2 className="text-[#00adb4] text-lg font-bold">
                      Void III
                    </h2>
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-[#173946] text-[#00adb4] font-mono rounded border border-[#00adb4]">
                      BETA
                    </span>
                  </div>
                  <div className="text-[#6c7a88] text-xs">
                    based on Gemini 2.0 Flash
                  </div>
                </div>
              </>
            ) : themeStyle === "soft" ? (
              <>
                <div className="w-1 h-8 bg-[#e39fc2] rounded-full mr-3"></div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h2 className="text-[#f4c1d8] text-xl font-medium">
                      Void III
                    </h2>
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-[#463343] text-[#e39fc2] rounded-full border border-[#e39fc2]">
                      BETA
                    </span>
                  </div>
                  <div className="text-[#a68c9b] text-xs">
                    based on Gemini 2.0 Flash
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="text-xl mr-2">🤖</span>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <h2 className="text-lg font-medium">Void III</h2>
                    <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded">
                      BETA
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    based on Gemini 2.0 Flash
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center">
            <button
              onClick={handleResetChat}
              className={
                themeStyle === "terminal"
                  ? "px-2 py-1 mr-2 bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4] hover:text-[#00adb4] text-xs"
                  : themeStyle === "soft"
                  ? "px-3 py-1 mr-2 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
                  : "px-3 py-1 mr-2 bg-gray-200 dark:bg-gray-600 rounded text-sm"
              }
              title="Reset conversation"
            >
              {themeStyle === "terminal" ? (
                "[reset]"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                  <path d="M21 3v5h-5"></path>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                  <path d="M8 16H3v5"></path>
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className={
                themeStyle === "terminal"
                  ? "px-2 py-1 bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4] text-xs"
                  : themeStyle === "soft"
                  ? "px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
                  : "px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm"
              }
            >
              {themeStyle === "terminal" ? "[x] close" : "Close"}
            </button>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className={`h-[400px] overflow-y-auto p-4 ${
            themeStyle === "terminal"
              ? "bg-[#060a10] text-[#e0e0e0]"
              : themeStyle === "soft"
              ? "bg-[#2a1e29] text-[#f0e6ef]"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          }`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === "user"
                    ? themeStyle === "terminal"
                      ? "bg-[#1a2734] text-[#e0e0e0]"
                      : themeStyle === "soft"
                      ? "bg-[#3a2939] text-[#f0e6ef]"
                      : "bg-blue-500 text-white"
                    : themeStyle === "terminal"
                    ? "bg-[#112130] text-[#e0e0e0] border border-[#393d46]"
                    : themeStyle === "soft"
                    ? "bg-[#382736] text-[#f0e6ef] border border-[#574655]"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                <div className="text-sm whitespace-pre-line">
                  {message.role === "bot"
                    ? renderContent(message.content)
                    : message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="text-left mb-4">
              <div
                className={`inline-block rounded-lg px-4 py-2 ${
                  themeStyle === "terminal"
                    ? "bg-[#112130] text-[#e0e0e0] border border-[#393d46]"
                    : themeStyle === "soft"
                    ? "bg-[#382736] text-[#f0e6ef] border border-[#574655]"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-gray-400"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-gray-400 animation-delay-200"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse bg-gray-400 animation-delay-400"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div
          className={`p-4 ${
            themeStyle === "terminal"
              ? "bg-[#0c1219] border-t border-[#393d46]"
              : themeStyle === "soft"
              ? "bg-[#3a2939] border-t border-[#574655]"
              : "bg-gray-100 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
          }`}
        >
          <div className="flex items-center">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              rows={1}
              className={`flex-grow resize-none px-3 py-2 rounded-l focus:outline-none ${
                themeStyle === "terminal"
                  ? "bg-[#060a10] text-[#e0e0e0] border border-[#393d46] focus:border-[#00adb4]"
                  : themeStyle === "soft"
                  ? "bg-[#382736] text-[#f0e6ef] border border-[#574655] focus:border-[#e39fc2]"
                  : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className={`px-4 py-2 ${
                themeStyle === "terminal"
                  ? "bg-[#0c1219] border border-[#00adb4] text-[#00adb4] hover:bg-[#00adb4] hover:text-[#0c1219]"
                  : themeStyle === "soft"
                  ? "bg-[#e39fc2] text-[#2a1e29] rounded-r hover:bg-[#f4c1d8]"
                  : "bg-blue-500 text-white rounded-r hover:bg-blue-600"
              } transition-colors`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoidBotModal;
