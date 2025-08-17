"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface ShareButtonProps {
  slug: string;
  title: string;
  description?: string;
}

export default function ShareButton({
  slug,
  title,
  description,
}: ShareButtonProps) {
  const { themeStyle } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const blogUrl = `https://rejaka.id/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(blogUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "share", {
        event_category: "Blog Engagement",
        event_label: platform,
        custom_parameter_1: slug,
        custom_parameter_2: title,
      });
    }

    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopied(true);

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "copy_link", {
          event_category: "Blog Engagement",
          event_label: "Copy Link",
          custom_parameter_1: slug,
        });
      }

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: title,
          text: description || `Check out this blog post: ${title}`,
          url: blogUrl,
        });

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "native_share", {
            event_category: "Blog Engagement",
            event_label: "Native Share",
            custom_parameter_1: slug,
          });
        }
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
    setIsOpen(false);
  };

  if (themeStyle === "terminal") {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 border border-[#393d46] text-[#8b9cbe] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors"
          aria-label="Share this post"
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
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16,6 12,2 8,6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          <span className="text-sm">share</span>
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 left-0 bg-[#0a1017] border border-[#393d46] rounded shadow-lg p-3 w-64 z-50">
            <div className="text-[#00adb4] text-xs font-bold mb-3 uppercase tracking-wide">
              Share Article
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#1da1f2] hover:text-[#1da1f2] transition-colors"
              >
                <span>🐦</span>
                <span>Twitter</span>
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#1877f2] hover:text-[#1877f2] transition-colors"
              >
                <span>📘</span>
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#0077b5] hover:text-[#0077b5] transition-colors"
              >
                <span>💼</span>
                <span>LinkedIn</span>
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#25d366] hover:text-[#25d366] transition-colors"
              >
                <span>💬</span>
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => handleShare("telegram")}
                className="flex items-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#0088cc] hover:text-[#0088cc] transition-colors"
              >
                <span>✈️</span>
                <span>Telegram</span>
              </button>

              <button
                onClick={() => handleShare("reddit")}
                className="flex items-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#ff4500] hover:text-[#ff4500] transition-colors"
              >
                <span>🔗</span>
                <span>Reddit</span>
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors"
              >
                <span>{copied ? "✅" : "📋"}</span>
                <span>{copied ? "Copied!" : "Copy Link"}</span>
              </button>

              {typeof navigator !== "undefined" && "share" in navigator && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-xs border border-[#393d46] hover:border-[#00adb4] hover:text-[#00adb4] transition-colors"
                >
                  <span>📱</span>
                  <span>Native Share</span>
                </button>
              )}
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border theme-border theme-text-secondary hover:theme-text-primary hover:shadow-md transition-all duration-300"
        aria-label="Share this post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <polyline points="16,6 12,2 8,6" />
          <line x1="12" y1="2" x2="12" y2="15" />
        </svg>
        <span className="text-sm font-medium">Share</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-3 left-0 theme-bg-primary border theme-border rounded-xl shadow-xl p-4 w-72 z-50">
          <div className="theme-accent-primary text-sm font-semibold mb-4">
            Share this article
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => handleShare("twitter")}
              className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#1da1f2]/10 hover:border-[#1da1f2] hover:text-[#1da1f2] transition-all"
            >
              <span>🐦</span>
              <span>Twitter</span>
            </button>

            <button
              onClick={() => handleShare("facebook")}
              className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#1877f2]/10 hover:border-[#1877f2] hover:text-[#1877f2] transition-all"
            >
              <span>📘</span>
              <span>Facebook</span>
            </button>

            <button
              onClick={() => handleShare("linkedin")}
              className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#0077b5]/10 hover:border-[#0077b5] hover:text-[#0077b5] transition-all"
            >
              <span>💼</span>
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => handleShare("whatsapp")}
              className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#25d366]/10 hover:border-[#25d366] hover:text-[#25d366] transition-all"
            >
              <span>💬</span>
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => handleShare("telegram")}
              className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#0088cc]/10 hover:border-[#0088cc] hover:text-[#0088cc] transition-all"
            >
              <span>✈️</span>
              <span>Telegram</span>
            </button>

            <button
              onClick={() => handleShare("reddit")}
              className="flex items-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#ff4500]/10 hover:border-[#ff4500] hover:text-[#ff4500] transition-all"
            >
              <span>🔗</span>
              <span>Reddit</span>
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#e6a2ce]/10 hover:border-[#e6a2ce] hover:text-[#e6a2ce] transition-all"
            >
              <span>{copied ? "✅" : "📋"}</span>
              <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </button>

            {typeof navigator !== "undefined" && "share" in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm rounded-lg border theme-border hover:bg-[#e6a2ce]/10 hover:border-[#e6a2ce] hover:text-[#e6a2ce] transition-all"
              >
                <span>📱</span>
                <span>More Options</span>
              </button>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
