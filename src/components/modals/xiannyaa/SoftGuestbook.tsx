"use client";
import React, { useState, useEffect } from "react";
import { GuestbookEntry, User } from "@/types/guestbook";
import ModalWrapper from "./ModalWrapper";

interface SoftGuestbookProps {
  onClose: () => void;
}

const SoftGuestbook: React.FC<SoftGuestbookProps> = ({ onClose }) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEntries();
    loadUser();
  }, []);

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

  const formatMessageDate = (date: Date) => {
    const messageDate = new Date(date);
    const day = messageDate.getDate().toString().padStart(2, "0");
    const month = (messageDate.getMonth() + 1).toString().padStart(2, "0");
    const year = messageDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const userEntry = entries.find((entry) => entry.userId === user?.userId);

  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-[#2e1e2e] border border-[#5d4a5c] rounded-2xl w-full max-w-6xl h-[80vh] sm:h-[80vh] h-[95vh] flex flex-col text-[#f5eaf4]">
        <div className="p-3 sm:p-4 border-b border-[#5d4a5c] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#e6a2ce] mr-2 rounded-full"></div>
            <h2 className="text-[#e6a2ce] text-lg sm:text-xl font-bold">
              Guestbook
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#d5c0d4] hover:text-[#e6a2ce] transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
          <div className="w-full lg:w-72 lg:min-w-72 border-b lg:border-b-0 lg:border-r border-[#5d4a5c] flex flex-col min-h-0">
            <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
              {!user ? (
                <div className="space-y-3 sm:space-y-4 h-full flex flex-col">
                  <div className="text-xs sm:text-sm text-[#d5c0d4] mb-3 sm:mb-4">
                    Sign in to leave a heartfelt message ✨
                  </div>
                  <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
                    <button
                      onClick={() => handleLogin("google")}
                      className="w-full p-2.5 sm:p-3 border border-[#5d4a5c] rounded-xl text-left hover:border-[#e6a2ce] hover:bg-[#3a2939] transition-all text-xs sm:text-sm bg-[#382736]"
                    >
                      <span className="text-[#e6a2ce]">🔐</span> Continue with
                      Google
                    </button>
                    <button
                      onClick={() => handleLogin("github")}
                      className="w-full p-2.5 sm:p-3 border border-[#5d4a5c] rounded-xl text-left hover:border-[#e6a2ce] hover:bg-[#3a2939] transition-all text-xs sm:text-sm bg-[#382736]"
                    >
                      <span className="text-[#e6a2ce]">🔐</span> Continue with
                      GitHub
                    </button>
                    <button
                      onClick={() => handleLogin("discord")}
                      className="w-full p-2.5 sm:p-3 border border-[#5d4a5c] rounded-xl text-left hover:border-[#e6a2ce] hover:bg-[#3a2939] transition-all text-xs sm:text-sm bg-[#382736]"
                    >
                      <span className="text-[#e6a2ce]">🔐</span> Continue with
                      Discord
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 h-full flex flex-col">
                  <div className="flex items-center space-x-3 p-2.5 sm:p-3 bg-[#382736] rounded-xl border border-[#5d4a5c] flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-7 sm:w-8 h-7 sm:h-8 rounded-full"
                    />
                    <div>
                      <div className="text-[#e6a2ce] text-xs sm:text-sm font-medium">
                        {user.username}
                      </div>
                      <div className="text-[#d5c0d4] text-[10px] sm:text-xs capitalize">
                        {user.provider}
                      </div>
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-3 sm:space-y-4 flex-1 flex flex-col"
                  >
                    <div className="flex-1 flex flex-col">
                      <label className="text-xs sm:text-sm text-[#d5c0d4] mb-2 block">
                        Your message 💝
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={
                          userEntry
                            ? "Update your message..."
                            : "Share your thoughts..."
                        }
                        className="w-full flex-1 min-h-[100px] sm:min-h-[150px] bg-[#382736] border border-[#5d4a5c] rounded-xl p-2.5 sm:p-3 text-xs sm:text-sm resize-none focus:border-[#e6a2ce] focus:outline-none"
                        maxLength={500}
                      />
                      <div className="text-[10px] sm:text-xs text-[#d5c0d4] mt-1">
                        {message.length}/500 characters
                      </div>
                    </div>

                    <div className="flex space-x-2 flex-shrink-0">
                      <button
                        type="submit"
                        disabled={loading || !message.trim()}
                        className="flex-1 p-2.5 sm:p-3 bg-[#e6a2ce] text-[#2e1e2e] text-xs sm:text-sm font-medium rounded-xl hover:bg-[#f4c1d8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {loading ? "Sending..." : userEntry ? "Update" : "Post"}
                      </button>
                      {userEntry && (
                        <button
                          type="button"
                          onClick={handleDelete}
                          disabled={loading}
                          className="px-2.5 sm:px-3 p-2.5 sm:p-3 border border-red-400 text-red-400 text-xs sm:text-sm rounded-xl hover:bg-red-400 hover:text-white disabled:opacity-50 transition-colors"
                        >
                          Del
                        </button>
                      )}
                    </div>
                  </form>

                  <button
                    onClick={handleLogout}
                    className="w-full p-2.5 sm:p-3 border border-[#5d4a5c] rounded-xl text-left hover:border-red-400 hover:text-red-400 transition-all text-xs sm:text-sm bg-[#382736] flex-shrink-0"
                  >
                    <span className="text-red-400">🚪</span> Sign Out
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 border border-red-400 bg-red-400 bg-opacity-10 text-red-400 text-xs sm:text-sm rounded-xl flex-shrink-0">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 p-3 sm:p-6 overflow-auto min-h-0 flex flex-col">
            <div className="text-xs sm:text-sm text-[#d5c0d4] mb-4 sm:mb-6 flex-shrink-0">
              Messages from visitors ✨ ({entries.length} total)
            </div>

            <div className="flex-1 flex flex-col">
              {entries.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl sm:text-5xl mb-3 sm:mb-4 opacity-30">
                      💕
                    </div>
                    <div className="text-xs sm:text-sm text-[#d5c0d4]">
                      No messages yet. Be the first to share your thoughts!
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4 overflow-y-auto">
                  {entries.map((entry) => (
                    <div
                      key={entry._id}
                      className="border border-[#5d4a5c] rounded-xl p-3 sm:p-5 hover:border-[#e6a2ce] transition-colors bg-[#382736]"
                    >
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <img
                            src={entry.avatar}
                            alt={entry.username}
                            className="w-6 sm:w-7 h-6 sm:h-7 rounded-full"
                          />
                          <div>
                            <div className="text-[#e6a2ce] text-xs sm:text-sm font-medium">
                              {entry.username}
                            </div>
                            <div className="text-[#d5c0d4] text-[10px] sm:text-xs">
                              {entry.provider} •{" "}
                              {formatMessageDate(entry.createdAt)}
                            </div>
                          </div>
                        </div>
                        {entry.userId === user?.userId && (
                          <div className="text-[#e6a2ce] text-[10px] sm:text-xs bg-[#e6a2ce] bg-opacity-20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
                            Your message
                          </div>
                        )}
                      </div>
                      <div className="text-xs sm:text-sm text-[#f5eaf4] leading-relaxed">
                        {entry.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#5d4a5c] p-2.5 sm:p-3 text-center flex-shrink-0">
          <div className="text-[10px] sm:text-xs text-[#d5c0d4]">
            {entries.length} message{entries.length !== 1 ? "s" : ""} shared
            with love 💝
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SoftGuestbook;
