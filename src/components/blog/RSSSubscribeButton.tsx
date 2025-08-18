"use client";

interface RSSSubscribeButtonProps {
  variant?: "terminal" | "soft";
}

const RSSSubscribeButton: React.FC<RSSSubscribeButtonProps> = ({
  variant = "terminal",
}) => {
  if (variant === "terminal") {
    return (
      <div className="flex gap-2 text-xs">
        <a
          href="/api/rss"
          className="text-[#00adb4] hover:underline hover:text-[#4dd0e1] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          title="Subscribe to RSS feed"
        >
          📡 rss
        </a>
        <span className="text-[#393d46]">|</span>
        <a
          href="/api/feed"
          className="text-[#00adb4] hover:underline hover:text-[#4dd0e1] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
          title="Subscribe to JSON feed"
        >
          📄 json
        </a>
      </div>
    );
  }

  return (
    <div className="flex gap-2 text-xs">
      <a
        href="/api/rss"
        className="text-[#e39fc2] hover:underline hover:text-[#f4c1d8] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        title="Subscribe to RSS feed"
      >
        📡 RSS Feed
      </a>
      <span className="text-[#8b7a8a]">•</span>
      <a
        href="/api/feed"
        className="text-[#e39fc2] hover:underline hover:text-[#f4c1d8] transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        title="Subscribe to JSON feed"
      >
        📄 JSON Feed
      </a>
    </div>
  );
};

export default RSSSubscribeButton;
