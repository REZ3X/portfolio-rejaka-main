import { useState, useEffect } from "react";

interface AuthUser {
  userId: string;
  username: string;
  email: string;
  avatar: string;
  provider: "google" | "github" | "discord";
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthUser = () => {
      if (typeof window !== "undefined") {
        try {
          const userCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("guestbook_user="));

          if (userCookie) {
            const userData = JSON.parse(
              decodeURIComponent(userCookie.split("=")[1])
            );
            setUser(userData);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error parsing user cookie:", error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuthUser();

    const interval = setInterval(checkAuthUser, 2000);

    const handleFocus = () => {
      setTimeout(checkAuthUser, 500);
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      document.cookie =
        "guestbook_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setUser(null);
      window.location.reload();
    }
  };

  const login = (provider: "google" | "github" | "discord") => {
    if (typeof window !== "undefined") {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `/api/auth/${provider}?redirect=${currentUrl}`;
    }
  };

  return { user, loading, login, logout };
};
