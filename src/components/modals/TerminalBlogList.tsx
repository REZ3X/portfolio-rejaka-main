"use client";
import React, { useRef, useEffect } from "react";
import { getAllPosts, formatDate } from "@/data/BlogData";
import { useRouter } from "next/navigation";

interface BlogListModalProps {
  onClose: () => void;
}

const TerminalBlogListModal: React.FC<BlogListModalProps> = ({ onClose }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const posts = getAllPosts();

  const lastVisitedBlogSlug =
    typeof window !== "undefined"
      ? localStorage.getItem("lastVisitedBlogSlug")
      : null;

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleBlogClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("mainPageScrollPosition", window.scrollY.toString());
      localStorage.setItem("blogReferrerSource", "blogList");
    }

    onClose();

    setTimeout(() => {
      router.push(`/blog/${slug}`);
    }, 10);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-4xl w-full max-h-[85vh] overflow-auto"
      >
        <div className="sticky top-0 z-10 bg-[#060a10] border-b border-[#393d46] flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <h2 className="text-[#00adb4] font-bold">
              Blog Posts by Rejaka Abimanyu Susanto
            </h2>
          </div>
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4]"
          >
            [x] close
          </button>
        </div>

        <div className="p-4">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-xs text-[#e0e0e0]">
                No blog posts available
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className={`border ${
                    lastVisitedBlogSlug === post.slug
                      ? "border-[#00adb4] bg-[#121a27]"
                      : "border-[#393d46]"
                  }`}
                >
                  <div className="p-3 border-b border-[#393d46] bg-[#0e121a]">
                    <div className="flex justify-between items-center">
                      <div
                        className={`font-bold ${
                          lastVisitedBlogSlug === post.slug
                            ? "text-[#00adb4]"
                            : "text-[#00adb4]"
                        }`}
                      >
                        {post.title}
                        {lastVisitedBlogSlug === post.slug && (
                          <span className="ml-2 text-xs bg-[#152130] border border-[#00adb4] px-1.5 py-0.5 rounded-sm">
                            Last Read
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#8b9cbe]">
                        {formatDate(post.date)}
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">
                        Reading time: {post.readingTime} min
                      </span>
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => handleBlogClick(e, post.slug)}
                        className="text-[#00adb4] hover:underline text-sm"
                      >
                        Read article →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-[#393d46] flex justify-between items-center">
          <div className="text-xs">
            <span className="text-[#8b9cbe]">Posts by</span>{" "}
            <span className="text-[#00adb4]">Rejaka Abimanyu Susanto</span>
          </div>
          <div className="text-xs text-[#8b9cbe]">
            {posts.length} {posts.length === 1 ? "article" : "articles"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalBlogListModal;