"use client";
import React, { useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { getAllPosts, formatDate } from "@/data/BlogData";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogListModalProps {
  onClose: () => void;
}

const BlogListModal: React.FC<BlogListModalProps> = ({ onClose }) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const { themeStyle } = useUser();
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

  if (themeStyle === "terminal") {
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
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-[9999] flex items-center justify-center p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border theme-border max-w-4xl w-full max-h-[85vh] overflow-hidden shadow-lg"
      >
        <div className="sticky top-0 z-10 theme-bg-primary border-b theme-border flex justify-between items-center p-4">
          <h2 className="theme-accent-primary text-xl font-bold">
            Articles by Rejaka Abimanyu Susanto
          </h2>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs bg-[#463343] theme-text-primary border theme-border hover:bg-[#574655] rounded-lg"
          >
            Close
          </button>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(85vh-72px)]">
          <div className="absolute top-20 right-8 opacity-10 -z-10">
            <div className="text-8xl text-[#e6a2ce]">✏️</div>
          </div>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-3xl mb-3">✨</div>
              <div className="text-lg theme-accent-primary mb-1">
                No articles yet
              </div>
              <div className="text-sm theme-text-secondary">
                Check back soon for new content from Rejaka Abimanyu Susanto
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className={`rounded-xl border ${
                    lastVisitedBlogSlug === post.slug
                      ? "border-[#e6a2ce] shadow-[0_0_10px_rgba(230,162,206,0.3)]"
                      : "theme-border"
                  } overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  {post.coverImage && (
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      {lastVisitedBlogSlug === post.slug && (
                        <div className="absolute top-3 right-3 bg-[#e6a2ce]/80 text-white text-xs px-2 py-1 rounded-full">
                          Last Read
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="theme-accent-primary text-lg font-medium mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm theme-text-secondary mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs theme-text-secondary">
                        {formatDate(post.date)} · {post.readingTime} min read
                      </span>
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => handleBlogClick(e, post.slug)}
                        className="theme-accent-primary hover:underline text-sm font-medium"
                      >
                        Read →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 pt-4 border-t theme-border text-center">
            <p className="text-sm theme-text-secondary">
              All articles by{" "}
              <span className="theme-accent-primary">
                Rejaka Abimanyu Susanto
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogListModal;
