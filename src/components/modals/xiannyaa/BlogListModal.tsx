"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  getAllPosts,
  getAllCategories,
  getPostsByCategory,
  searchPosts,
  formatDate,
} from "@/data/BlogData";
import Image from "next/image";
import ModalWrapper from "./ModalWrapper";

interface SoftBlogListModalProps {
  onClose: () => void;
  initialCategory?: string;
  initialSearch?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
}

const SoftBlogListModal: React.FC<SoftBlogListModalProps> = ({
  onClose,
  initialCategory = "all",
  initialSearch = "",
  onCategoryChange,
  onSearchChange,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredPosts, setFilteredPosts] = useState(getAllPosts());

  const categories = ["all", ...getAllCategories()];

  const lastVisitedBlogSlug =
    typeof window !== "undefined"
      ? localStorage.getItem("lastVisitedBlogSlug")
      : null;

  const handleClose = () => {
    console.log("BlogListModal: handleClose called");
    onClose();
  };

  const closeWithCleanup = () => {
    console.log("Closing modal and cleaning up URL");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("modal");
      url.searchParams.delete("category");
      url.searchParams.delete("search");
      window.history.replaceState({}, "", url);

      window.location.href = url.toString();
    }
  };

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

  const handleBlogClick = (slug: string) => {
    handleClose();

    setTimeout(() => {
      window.location.href = `/blog/${slug}`;
    }, 100);

    if (typeof window !== "undefined") {
      localStorage.setItem("mainPageScrollPosition", window.scrollY.toString());
      localStorage.setItem("blogReferrerSource", "blogList");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Tutorial: "bg-[#3a2939] text-[#e39fc2]",
      Story: "bg-[#463343] text-[#f4c1d8]",
      "Development Tools": "bg-[#5d4a5c] text-[#d5c0d4]",
      Database: "bg-[#4e3a4d] text-[#e6a2ce]",
      Linux: "bg-[#3a1f37] text-[#c678a4]",
    };
    return colors[category] || "bg-[#3a2939] text-[#e39fc2]";
  };

  return (
    <ModalWrapper onClose={handleClose}>
      <div
        ref={modalRef}
        className="theme-font theme-bg-primary theme-text-primary rounded-2xl border theme-border max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-lg"
      >
        <div className="sticky top-0 z-10 theme-bg-primary border-b theme-border flex justify-between items-center p-4">
          <h2 className="theme-accent-primary text-xl font-bold">
            📝 Blog Articles by Rejaka Abimanyu
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWithCleanup();
            }}
            className="px-3 py-1.5 text-xs bg-[#463343] theme-text-primary border theme-border hover:bg-[#574655] rounded-lg"
          >
            Close
          </button>
        </div>

        <div className="sticky top-[73px] z-10 theme-bg-primary border-b theme-border p-4 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 theme-text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-2 rounded-lg border theme-border theme-bg-primary theme-text-primary placeholder-gray-400 focus:outline-none focus:border-[#e39fc2] text-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-[#e39fc2] text-[#2a1e29] font-medium shadow-md"
                    : "bg-[#463343] text-[#e39fc2] hover:bg-[#574655]"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm theme-text-secondary">
            <span>
              {searchQuery
                ? `Search: "${searchQuery}"`
                : selectedCategory !== "all"
                ? `Category: ${selectedCategory}`
                : "All Articles"}
            </span>
            <span>
              {filteredPosts.length} article
              {filteredPosts.length !== 1 ? "s" : ""} found
            </span>
          </div>
        </div>

        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)]">
          <div className="absolute top-20 right-8 opacity-10 -z-10">
            <div className="text-8xl text-[#e6a2ce]">✏️</div>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-3xl mb-3">🔍</div>
              <div className="text-lg theme-accent-primary mb-1">
                No articles found
              </div>
              <div className="text-sm theme-text-secondary text-center">
                {searchQuery
                  ? `No articles match "${searchQuery}". Try different keywords.`
                  : `No articles in "${selectedCategory}" category yet.`}
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-[#e39fc2] text-[#2a1e29] rounded-lg hover:bg-[#c678a4] transition-colors"
                >
                  View All Articles
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <div
                  key={post.slug}
                  className={`rounded-xl border ${
                    lastVisitedBlogSlug === post.slug
                      ? "border-[#e6a2ce] shadow-[0_0_10px_rgba(230,162,206,0.3)]"
                      : "theme-border"
                  } overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg group`}
                >
                  {post.coverImage && (
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        {post.category && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              post.category
                            )}`}
                          >
                            {post.category}
                          </span>
                        )}
                      </div>
                      {lastVisitedBlogSlug === post.slug && (
                        <div className="absolute top-3 right-3 bg-[#e6a2ce]/90 text-white text-xs px-2 py-1 rounded-full">
                          Last Read
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="theme-accent-primary text-lg font-medium line-clamp-2 flex-1">
                        {post.title}
                      </h3>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-[#382736] text-[#c4b2c3] text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-[#382736] text-[#c4b2c3] text-xs rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-sm theme-text-secondary mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs theme-text-secondary">
                        {formatDate(post.date)} · {post.readingTime} min read
                      </span>
                      <button
                        onClick={() => handleBlogClick(post.slug)}
                        className="theme-accent-primary hover:underline text-sm font-medium group-hover:translate-x-1 transition-transform duration-200"
                      >
                        Read →
                      </button>
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
    </ModalWrapper>
  );
};

export default SoftBlogListModal;
