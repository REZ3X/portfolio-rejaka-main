"use client";
import React, { useState, useEffect } from "react";
import { GuestbookEntry, User } from "@/types/guestbook";

interface TerminalGuestbookProps {
  onClose: () => void;
}

const TerminalGuestbook: React.FC<TerminalGuestbookProps> = ({ onClose }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEntries();
    loadUser();
  }, []);

  const formatMessageDate = (date: Date) => {
    const messageDate = new Date(date);
    const day = messageDate.getDate().toString().padStart(2, "0");
    const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
    const year = messageDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const loadUser = () => {
    if (typeof window !== "undefined") {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("guestbook_user="));

      if (userCookie) {
        try {
          const userData = JSON.parse(
            decodeURIComponent(userCookie.split("=")[1])
          );
          setUser(userData);
        } catch (error) {
          console.error("Error parsing user cookie:", error);
        }
      }
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/guestbook");
      const data = await response.json();
      setEntries(data.entries || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setError("Failed to load entries");
    }
  };

  const handleLogin = (provider: "google" | "github" | "discord") => {
    window.location.href = `/api/auth/${provider}`;
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      document.cookie =
        "guestbook_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
      setMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !message.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), user }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("");
        await fetchEntries();
      } else {
        setError(data.error || "Failed to save message");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setError("Failed to save message");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const response = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.userId }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("");
        await fetchEntries();
      } else {
        setError(data.error || "Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setError("Failed to delete message");
    } finally {
      setLoading(false);
    }
  };

  const userEntry = entries.find((entry) => entry.userId === user?.userId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-[#060a10] border border-[#393d46] rounded-none w-full max-w-4xl h-[95vh] sm:h-[80vh] flex flex-col font-mono text-[#e0e0e0]">
        <div className="p-2 sm:p-2.5 border-b border-[#393d46] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <span className="text-[#00adb4] font-bold text-xs sm:text-sm">
              Guestbook
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#8b9cbe] hover:text-[#00adb4] transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-[#393d46] p-2 sm:p-3 flex flex-col">
            {!user ? (
              <div className="space-y-2 sm:space-y-3">
                <div className="text-[10px] sm:text-xs text-[#8b9cbe] mb-2 sm:mb-3">
                  &gt; Sign in to leave a message
                </div>
                <button
                  onClick={() => handleLogin("google")}
                  className="w-full p-1.5 sm:p-2 border border-[#393d46] text-left hover:border-[#00adb4] hover:bg-[#0a1017] transition-all text-[10px] sm:text-xs"
                >
                  <span className="text-[#00adb4]">$</span> auth
                  --provider=google
                </button>
                <button
                  onClick={() => handleLogin("github")}
                  className="w-full p-1.5 sm:p-2 border border-[#393d46] text-left hover:border-[#00adb4] hover:bg-[#0a1017] transition-all text-[10px] sm:text-xs"
                >
                  <span className="text-[#00adb4]">$</span> auth
                  --provider=github
                </button>
                <button
                  onClick={() => handleLogin("discord")}
                  className="w-full p-1.5 sm:p-2 border border-[#393d46] text-left hover:border-[#00adb4] hover:bg-[#0a1017] transition-all text-[10px] sm:text-xs"
                >
                  <span className="text-[#00adb4]">$</span> auth
                  --provider=discord
                </button>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-5 sm:w-6 h-5 sm:h-6 rounded-full"
                  />
                  <div>
                    <div className="text-[#00adb4] text-[10px] sm:text-xs">
                      {user.username}
                    </div>
                    <div className="text-[#8b9cbe] text-[8px] sm:text-[10px]">
                      {user.provider}
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-2 sm:space-y-3"
                >
                  <div>
                    <div className="text-[10px] sm:text-xs text-[#8b9cbe] mb-1">
                      &gt; echo &quot;{message}&quot; {">"} guestbook.txt
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        userEntry
                          ? "Update your message..."
                          : "Leave a message..."
                      }
                      className="w-full h-16 sm:h-20 bg-[#0a1017] border border-[#393d46] p-1.5 sm:p-2 text-[10px] sm:text-xs resize-none focus:border-[#00adb4] focus:outline-none"
                      maxLength={500}
                    />
                    <div className="text-[8px] sm:text-[10px] text-[#8b9cbe] mt-1">
                      {message.length}/500 characters
                    </div>
                  </div>

                  <div className="flex space-x-1.5 sm:space-x-2">
                    <button
                      type="submit"
                      disabled={loading || !message.trim()}
                      className="flex-1 p-1.5 sm:p-2 bg-[#00adb4] text-black text-[10px] sm:text-xs font-bold hover:bg-[#4dd0e1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? "..." : userEntry ? "UPDATE" : "POST"}
                    </button>
                    {userEntry && (
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="px-2 sm:px-3 p-1.5 sm:p-2 border border-red-500 text-red-500 text-[10px] sm:text-xs hover:bg-red-500 hover:text-black disabled:opacity-50 transition-colors"
                      >
                        DEL
                      </button>
                    )}
                  </div>
                </form>

                <button
                  onClick={handleLogout}
                  className="w-full p-1.5 sm:p-2 border border-[#393d46] text-left hover:border-red-500 hover:text-red-500 transition-all text-[10px] sm:text-xs"
                >
                  <span className="text-red-500">$</span> logout
                </button>
              </div>
            )}

            {error && (
              <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 border border-red-500 bg-red-500 bg-opacity-10 text-red-500 text-[10px] sm:text-xs">
                ERROR: {error}
              </div>
            )}
          </div>

          <div className="flex-1 p-2 sm:p-3 overflow-auto">
            <div className="text-[10px] sm:text-xs text-[#8b9cbe] mb-2 sm:mb-3">
              &gt; cat guestbook.txt ({entries.length} entries)
            </div>

            <div className="space-y-2 sm:space-y-3">
              {entries.map((entry) => (
                <div
                  key={entry._id}
                  className="border border-[#393d46] p-2 sm:p-3 hover:border-[#00adb4] transition-colors"
                >
                  <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <img
                        src={entry.avatar}
                        alt={entry.username}
                        className="w-4 sm:w-5 h-4 sm:h-5 rounded-full"
                      />
                      <div>
                        <div className="text-[#00adb4] text-[10px] sm:text-xs font-bold">
                          {entry.username}
                        </div>
                        <div className="text-[#8b9cbe] text-[8px] sm:text-[10px]">
                          {entry.provider} •{" "}
                          {formatMessageDate(entry.createdAt)}
                        </div>
                      </div>
                    </div>
                    {entry.userId === user?.userId && (
                      <div className="text-[#00adb4] text-[8px] sm:text-[10px]">
                        YOU
                      </div>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#e0e0e0] leading-relaxed">
                    {entry.message}
                  </div>
                </div>
              ))}

              {entries.length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-xl sm:text-2xl mb-2 opacity-30">📝</div>
                  <div className="text-[10px] sm:text-xs text-[#8b9cbe]">
                    No entries yet. Be the first to sign!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#393d46] p-2 sm:p-2.5 text-center">
          <div className="text-[8px] sm:text-[10px] text-[#8b9cbe]">
            {entries.length} signature{entries.length !== 1 ? "s" : ""} • Press
            ESC to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalGuestbook;
