"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  getAllPosts,
  getAllCategories,
  getPostsByCategory,
  searchPosts,
  formatDate,
} from "@/data/BlogData";
import { useRouter } from "next/navigation";

interface BlogListModalProps {
  onClose: () => void;
  initialCategory?: string;
  initialSearch?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
}

const TerminalBlogListModal: React.FC<BlogListModalProps> = ({
  onClose,
  initialCategory = "all",
  initialSearch = "",
  onCategoryChange,
  onSearchChange,
}) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredPosts, setFilteredPosts] = useState(getAllPosts());

  const categories = ["all", ...getAllCategories()];

  const handleClose = () => {
    console.log("TerminalBlogListModal: handleClose called");
    onClose();
  };

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

  useEffect(() => {
    let posts = getAllPosts();

    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery.trim());
    } else if (selectedCategory !== "all") {
      posts = getPostsByCategory(selectedCategory);
    }

    setFilteredPosts(posts);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("modal", "blogList");
      url.searchParams.set("category", selectedCategory);
      if (searchQuery.trim()) {
        url.searchParams.set("search", searchQuery);
      } else {
        url.searchParams.delete("search");
      }
      window.history.pushState({}, "", url);
    }

    onCategoryChange?.(selectedCategory);
    onSearchChange?.(searchQuery);
  }, [selectedCategory, searchQuery, onCategoryChange, onSearchChange]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setSelectedCategory("all");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const handleBlogClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("mainPageScrollPosition", window.scrollY.toString());
      localStorage.setItem("blogReferrerSource", "blogList");
    }

    handleClose();
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
        className="font-mono bg-[#060a10] text-[#e0e0e0] border border-[#393d46] max-w-5xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="sticky top-0 z-10 bg-[#060a10] border-b border-[#393d46] flex justify-between items-center p-4">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-[#00adb4] mr-1.5"></div>
            <h2 className="text-[#00adb4] font-bold">
              Blog Posts by Rejaka Abimanyu Susanto
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="px-2 py-1 text-xs bg-[#202832] text-[#e0e0e0] border border-[#393d46] hover:border-[#00adb4]"
          >
            [x] close
          </button>
        </div>

        <div className="sticky top-[73px] z-10 bg-[#060a10] border-b border-[#393d46] p-3 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 bg-[#0a1017] border border-[#393d46] text-[#e0e0e0] placeholder-[#8b9cbe] focus:outline-none focus:border-[#00adb4] text-sm font-mono"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#8b9cbe] hover:text-[#00adb4] text-xs"
              >
                [clear]
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-2 py-1 text-xs border transition-colors ${
                  selectedCategory === category
                    ? "bg-[#202832] border-[#00adb4] text-[#00adb4]"
                    : "border-[#393d46] text-[#e0e0e0] hover:border-[#00adb4]"
                }`}
              >
                {category === "all" ? "all" : category.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-[#8b9cbe]">
            <span>
              {searchQuery
                ? `search: "${searchQuery}"`
                : selectedCategory !== "all"
                ? `filter: ${selectedCategory.toLowerCase()}`
                : "showing: all"}
            </span>
            <span>
              {filteredPosts.length} result
              {filteredPosts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <div className="p-4 overflow-auto max-h-[calc(90vh-180px)]">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-xs text-[#8b9cbe] mb-3">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : `No posts in category "${selectedCategory}"`}
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={clearSearch}
                  className="text-[#00adb4] hover:underline text-xs"
                >
                  [show all posts]
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className={`border ${
                    lastVisitedBlogSlug === post.slug
                      ? "border-[#00adb4] bg-[#121a27]"
                      : "border-[#393d46]"
                  }`}
                >
                  <div className="p-3 border-b border-[#393d46] bg-[#0e121a]">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`font-bold text-sm ${
                              lastVisitedBlogSlug === post.slug
                                ? "text-[#00adb4]"
                                : "text-[#00adb4]"
                            }`}
                          >
                            {post.title}
                          </div>
                          {post.category && (
                            <span className="px-1.5 py-0.5 bg-[#202832] text-[#8b9cbe] text-xs border border-[#393d46]">
                              {post.category.toLowerCase()}
                            </span>
                          )}
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-1">
                            {post.tags.slice(0, 4).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs text-[#8b9cbe]"
                              >
                                #{tag.toLowerCase()}
                              </span>
                            ))}
                            {post.tags.length > 4 && (
                              <span className="text-xs text-[#8b9cbe]">
                                +{post.tags.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-[#8b9cbe] flex flex-col items-end">
                        <span>{formatDate(post.date)}</span>
                        {lastVisitedBlogSlug === post.slug && (
                          <span className="text-xs bg-[#152130] border border-[#00adb4] px-1 py-0.5 rounded-sm mt-1">
                            last_read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm mb-3">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#8b9cbe]">
                        runtime: {post.readingTime}min
                      </span>
                      <a
                        href={`/blog/${post.slug}`}
                        onClick={(e) => handleBlogClick(e, post.slug)}
                        className="text-[#00adb4] hover:underline text-sm"
                      >
                        cat {post.slug} →
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
            <span className="text-[#8b9cbe]">author:</span>{" "}
            <span className="text-[#00adb4]">rejaka_abimanyu_susanto</span>
          </div>
          <div className="text-xs text-[#8b9cbe]">
            {filteredPosts.length}/{getAllPosts().length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalBlogListModal;
