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

    const fallbackContent = {
    title: "Technical Articles & Tutorials",
    description: "Explore web development tutorials, programming guides, and technical insights from a web developer's perspective.",
    topics: ["Web Development", "Programming", "Tech Story", "Team"]
  };

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
              {fallbackContent.title}
            </h2>
          </div>
          <span className="text-xs text-[#8b9cbe]">
            {posts.length} articles
          </span>
        </div>

        <div className="p-3 border-b border-[#393d46] bg-[#0a1017]">
          <p className="text-xs text-[#8b9cbe] mb-2">
            {fallbackContent.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {fallbackContent.topics.map((topic) => (
              <span key={topic} className="px-2 py-0.5 bg-[#202832] text-[#00adb4] text-xs border border-[#393d46]">
                {topic}
              </span>
            ))}
          </div>
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
          <div className="text-xs text-[#8b9cbe] mb-2">
            <p>Author: Rejaka Abimanyu Susanto</p>
            <p>Web Developer | Programmer</p>
          </div>
          <div className="flex justify-between items-center">
            <RSSSubscribeButton />
            <button
              onClick={openBlogListModal}
              className="text-xs text-[#00adb4] hover:text-[#4dd0e1] hover:underline transition-colors"
            >
              view all articles →
            </button>
          </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Blog;