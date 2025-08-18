"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import { getAllPosts, formatDate } from "@/data/BlogData";
import { useRouter } from "next/navigation";
import RSSSubscribeButton from "@/components/blog/RSSSubscribeButton";

interface BlogProps {
  openBlogListModal: () => void;
}

const Blog: React.FC<BlogProps> = ({ openBlogListModal }) => {
  const { themeStyle } = useUser();
  const router = useRouter();
  const posts = getAllPosts().slice(0, 4);

  const handleBlogClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("mainPageScrollPosition", window.scrollY.toString());
      localStorage.setItem("blogReferrerSource", "main");
      localStorage.removeItem("reopenBlogList");
      localStorage.removeItem("scrollToBlogComponent");
    }

    router.push(`/blog/${slug}`);
  };

  if (themeStyle === "terminal") {
    return (
      <>
        <div className="font-mono bg-[#060a10] text-[#e0e0e0] rounded-none border border-[#393d46] h-full flex flex-col">
          <div className="p-3 border-b border-[#393d46] flex items-center justify-between bg-[#0a1017]">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-[#00adb4] mr-2"></div>
              <h2 className="text-[#00adb4] font-bold text-base">
                Latest Articles
              </h2>
            </div>
            <span className="text-xs text-[#8b9cbe]">
              {posts.length} recent
            </span>
          </div>

          <div className="p-3 flex-grow overflow-auto">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="text-2xl mb-2 opacity-30">📝</div>
                <div className="text-xs text-[#8b9cbe]">
                  No articles available
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="border border-[#393d46] bg-[#0a1017] hover:border-[#00adb4] transition-colors group cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      const syntheticEvent = {
                        ...e,
                        preventDefault: () => {},
                      } as React.MouseEvent;
                      handleBlogClick(syntheticEvent, post.slug);
                    }}
                  >
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-[#00adb4] font-bold text-sm leading-tight flex-1 pr-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="text-xs text-[#8b9cbe] flex flex-col items-end shrink-0">
                          <span>{formatDate(post.date)}</span>
                          <span className="text-[#00adb4]">
                            {post.readingTime}min
                          </span>
                        </div>
                      </div>

                      {post.category && (
                        <div className="mb-2">
                          <span className="px-2 py-0.5 bg-[#202832] text-[#8b9cbe] text-xs border border-[#393d46]">
                            {post.category}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <p className="text-xs text-[#e0e0e0] leading-relaxed mb-2 line-clamp-1">
                          {post.excerpt.length > 80
                            ? `${post.excerpt.substring(0, 80)}...`
                            : post.excerpt}
                        </p>
                        <span className="text-[#00adb4] text-xs group-hover:text-[#4dd0e1]">
                          read →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#393d46] bg-[#0a1017]">
            <div className="flex justify-between items-center">
              <RSSSubscribeButton />
              <button
                onClick={openBlogListModal}
                className="text-xs text-[#00adb4] hover:text-[#4dd0e1] hover:underline transition-colors"
              >
                view all →
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="theme-font theme-bg-primary theme-text-primary rounded-2xl shadow-md h-full flex flex-col soft-card overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-[#3a1f37] to-[#2c1927] flex items-center justify-between">
          <h2 className="text-[#f4c1d8] font-medium text-lg">
            Latest Articles
          </h2>
          <span className="text-xs text-[#c4b2c3]">{posts.length} recent</span>
        </div>

        <div className="p-3 flex-grow overflow-auto">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-sm text-[#f0e6ef]">No articles yet</div>
            </div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  onClick={(e) => {
                    e.preventDefault();
                    const syntheticEvent = {
                      ...e,
                      preventDefault: () => {},
                    } as React.MouseEvent;
                    handleBlogClick(syntheticEvent, post.slug);
                  }}
                  className="p-3 rounded-lg bg-[#382736] hover:bg-[#3a2839] transition-colors duration-200 border border-[#574655] hover:border-[#e39fc2] cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[#e39fc2] font-medium text-sm leading-tight flex-1 pr-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="text-xs text-[#c4b2c3] shrink-0">
                      {post.readingTime}min
                    </span>
                  </div>

                  <p className="text-xs text-[#c4b2c3] line-clamp-1 mb-2">
                    {post.excerpt.length > 60
                      ? `${post.excerpt.substring(0, 60)}...`
                      : post.excerpt}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#c4b2c3]">
                      {formatDate(post.date)}
                    </span>
                    <span className="text-[#e39fc2] text-sm group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-[#574655] flex justify-between items-center">
          <RSSSubscribeButton />
          <button
            onClick={openBlogListModal}
            className="text-sm text-[#e39fc2] hover:text-[#f4c1d8] transition-colors"
          >
            View all →
          </button>
        </div>
      </div>
    </>
  );
};

export default Blog;
