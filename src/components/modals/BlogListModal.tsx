"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import TerminalBlogListModal from "./TerminalBlogList";
import SoftBlogListModal from "./xiannyaa/BlogListModal";

interface BlogListModalProps {
  onClose: () => void;
  initialCategory?: string;
  initialSearch?: string;
  onCategoryChange?: (category: string) => void;
  onSearchChange?: (search: string) => void;
}

const BlogListModal: React.FC<BlogListModalProps> = ({ 
  onClose, 
  initialCategory = "all",
  initialSearch = "",
  onCategoryChange,
  onSearchChange
}) => {
  const { themeStyle } = useUser();

  return themeStyle === "terminal" ? (
    <TerminalBlogListModal 
      onClose={onClose} 
      initialCategory={initialCategory}
      initialSearch={initialSearch}
      onCategoryChange={onCategoryChange}
      onSearchChange={onSearchChange}
    />
  ) : (
    <SoftBlogListModal 
      onClose={onClose} 
      initialCategory={initialCategory}
      initialSearch={initialSearch}
      onCategoryChange={onCategoryChange}
      onSearchChange={onSearchChange}
    />
  );
};

export default BlogListModal;