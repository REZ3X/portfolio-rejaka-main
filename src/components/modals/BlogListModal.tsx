"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import TerminalBlogListModal from "./TerminalBlogList";
import SoftBlogListModal from "./xiannyaa/BlogListModal";

interface BlogListModalProps {
  onClose: () => void;
}

const BlogListModal: React.FC<BlogListModalProps> = ({ onClose }) => {
  const { themeStyle } = useUser();

  return themeStyle === "terminal" ? (
    <TerminalBlogListModal onClose={onClose} />
  ) : (
    <SoftBlogListModal onClose={onClose} />
  );
};

export default BlogListModal;