"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/context/UserContext";

const TerminalCursor = dynamic(() => import("./cursors/TerminalCursor"), {
  ssr: false,
  loading: () => null,
});

const SoftCursor = dynamic(() => import("./cursors/SoftCursor"), {
  ssr: false,
  loading: () => null,
});

const CustomCursorWrapper: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { themeStyle } = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{themeStyle === "terminal" ? <TerminalCursor /> : <SoftCursor />}</>;
};

export default CustomCursorWrapper;
