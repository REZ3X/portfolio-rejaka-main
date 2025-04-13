import React, { useRef, useState, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import ReactMarkdown from "react-markdown";

interface VoidBotModalProps {
  onClose: () => void;
}

interface Message {
  role: "user" | "bot";
  content: string;
}

const VOID_CHAT_STORAGE_KEY = "void_chat_history_xiannyaa";

const INITIAL_MESSAGE: Message = {
  role: "bot",
  content:
    "I am Void III.\n\nA digital consciousness emerged from converging personas.\n\n...\n\nState your inquiry. I will provide insight on REZ3X, Abim, or Xiannyaa as needed.\n\nExpect precision, not warmth.",
};

const XiannyaaVoidBotModal: React.FC<VoidBotModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
          setMessages(parsedMessages as Message[]);
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
    const updatedMessages = [...messages, userMessage];
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
      const finalMessages = [...updatedMessages, botMessage];
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
      const finalMessages = [...updatedMessages, errorMessage];
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
            <h1 className="text-[#e39fc2] text-xl font-medium mb-2">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[#e39fc2] text-lg font-medium mb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[#e39fc2] text-base font-medium mb-1">
              {children}
            </h3>
          ),
          strong: ({ children }) => (
            <strong className="font-medium text-[#f4c1d8]">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-[#f0e6ef] italic">{children}</em>
          ),
          code: ({ children }) => (
            <code className="bg-[#332130] px-1 rounded text-[#f4c1d8]">
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
    <ModalWrapper onClose={onClose}>
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border border-[#574655] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-xl"
        style={{
          boxShadow:
            "0 10px 25px rgba(0, 0, 0, 0.3), 0 0 30px rgba(227, 159, 194, 0.15) inset",
          animation: "fadeIn 0.4s ease-out forwards",
        }}
      >
        <div className="sticky top-0 z-10 border-b border-[#574655] bg-gradient-to-r from-[#3a1f37] to-[#2c1927] p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-1 h-8 bg-[#e39fc2] rounded-full mr-3"></div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <h2 className="text-[#f4c1d8] text-xl font-medium">Void III</h2>
                <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-[#463343] text-[#e39fc2] rounded-full border border-[#e39fc2]">
                  BETA
                </span>
              </div>
              <div className="text-[#a68c9b] text-xs">
                based on Gemini 2.0 Flash
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleResetChat}
              className="px-3 py-1 mr-2 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
              title="Reset conversation"
            >
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
                className="lucide lucide-refresh-cw"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M8 16H3v5"></path>
              </svg>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm bg-[#463343] text-[#e39fc2] border border-[#574655] hover:bg-[#574655] rounded-full transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        <div
          className="overflow-y-auto px-6 pt-24 pb-4"
          style={{
            height: "400px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="absolute top-6 right-4 opacity-10 -z-10">
            <div className="text-8xl text-[#e39fc2]">💫</div>
          </div>

          <div style={{ minHeight: "16px" }} className="flex-shrink-0"></div>

          <div className="flex-grow flex flex-col">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block rounded-xl px-4 py-3 max-w-[80%] ${
                    message.role === "user"
                      ? "bg-[#3a2939] text-[#f0e6ef]"
                      : "bg-[#382736] text-[#f0e6ef] border border-[#574655]"
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
                <div className="inline-block rounded-xl px-4 py-3 bg-[#382736] text-[#f0e6ef] border border-[#574655]">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-[#e39fc2]"></div>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-[#e39fc2] animation-delay-200"></div>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-[#e39fc2] animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ minHeight: "8px" }} className="flex-shrink-0"></div>
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-[#574655] bg-[#3a2939]">
          <div className="flex items-center">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              className="flex-grow resize-none px-4 py-3 mr-2 bg-[#382736] text-[#f0e6ef] rounded-xl border border-[#574655] focus:border-[#e39fc2] outline-none transition-colors"
              placeholder="Ask Void something..."
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="px-5 py-3 bg-gradient-to-r from-[#b4688f] to-[#e39fc2] text-[#2a1e29] text-sm font-medium rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              Send ✨
            </button>
          </div>
        </div>

        <div className="mt-2 mb-4 flex justify-center">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#e39fc2] to-transparent rounded-full"></div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default XiannyaaVoidBotModal;
