import React, { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { themeStyle } = useUser();

  useEffect(() => {
    const fetchBlogFeed = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_MAIN}/fuwafuwa`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog feed");
        }

        const data = await response.json();
        setBlogPosts(data.slice(0, 4));
      } catch (error) {
        console.error(error);
        setError("Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogFeed();
  }, []);

  const decodeHtmlEntities = (text: string): string => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (themeStyle === "terminal") {
    return (
      <div className="font-mono bg-[#060a10] text-[#e0e0e0] rounded-none border border-[#393d46] h-full flex flex-col">
        <div className="p-2.5 border-b border-[#393d46] flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <h2 className="text-[#00adb4] font-bold text-base">Recent Posts</h2>
          </div>
        </div>

        <div className="p-3 flex-grow">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xs text-[#393d46]">Loading posts...</div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xs text-[#e0e0e0]">{error}</div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-xs text-[#e0e0e0]">
                No blog posts available
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="block border border-[#393d46] p-2.5 hover:border-[#00adb4] transition-colors duration-200"
                >
                  <h3 className="text-[#00adb4] font-bold text-sm truncate">
                    {decodeHtmlEntities(post.title)}
                  </h3>
                  <div className="flex justify-between items-center mt-1.5">
                    <span className="text-xs text-[#e0e0e0] opacity-75">
                      {formatDate(post.pubDate)}
                    </span>
                    <span className="text-xs text-[#393d46]">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="p-1.5 border-t border-[#393d46] text-center">
          <a
            href="https://yourblog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00adb4] hover:underline inline-block py-0.5 px-2"
          >
            View all posts
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-font theme-bg-primary theme-text-primary rounded-2xl shadow-md h-full flex flex-col soft-card overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-[#3a1f37] to-[#2c1927] flex items-center">
        <h2 className="text-[#f4c1d8] font-medium text-lg">Latest Articles</h2>
      </div>

      <div className="p-3 flex-grow">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-[#c4b2c3] animate-pulse">
              Loading my articles...
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-3xl mb-2">😢</div>
            <div className="text-sm text-[#f0e6ef] mb-1">
              Couldn't load articles
            </div>
            <div className="text-xs text-[#c4b2c3]">
              Please check back later
            </div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="text-3xl mb-2">✨</div>
            <div className="text-sm text-[#f0e6ef]">No articles yet</div>
            <div className="text-xs text-[#c4b2c3] mt-1">
              Check back soon for new content
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {blogPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block p-3 rounded-lg bg-[#382736] hover:bg-[#3a2839] transition-colors duration-200 border border-[#574655] hover:border-[#e39fc2]"
              >
                <h3 className="text-[#e39fc2] font-medium text-base truncate">
                  {decodeHtmlEntities(post.title)}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-[#c4b2c3]">
                    {formatDate(post.pubDate)}
                  </span>
                  <span className="text-sm text-[#e39fc2]">Read →</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-[#574655] text-center">
        <a
          href="https://yourblog.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 text-sm rounded-full bg-[#3a1f37] text-[#e39fc2] hover:bg-[#463343] inline-block"
        >
          View all articles
        </a>
      </div>
    </div>
  );
};

export default Blog;
