"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserAlias = "rez3x" | "abim" | "xiannyaa";
export type ThemeStyle = "terminal" | "soft";

interface UserContextType {
  activeUser: UserAlias;
  setActiveUser: (user: UserAlias) => void;
  themeStyle: ThemeStyle;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeUser, setActiveUser] = useState<UserAlias>("rez3x");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("preferred-user");
      if (
        savedUser &&
        (savedUser === "rez3x" ||
          savedUser === "abim" ||
          savedUser === "xiannyaa")
      ) {
        setActiveUser(savedUser as UserAlias);
      }
    }
  }, []);

  const themeStyle: ThemeStyle =
    activeUser === "xiannyaa" ? "soft" : "terminal";

  const handleUserChange = (user: UserAlias) => {
    const currentTheme: ThemeStyle =
      activeUser === "xiannyaa" ? "soft" : "terminal";

    const newTheme: ThemeStyle = user === "xiannyaa" ? "soft" : "terminal";

    if (typeof window !== "undefined") {
      localStorage.setItem("preferred-user", user);
    }

    if (currentTheme !== newTheme) {
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } else {
      setActiveUser(user);

      document.documentElement.classList.add("theme-transition");
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 500);
    }
  };

  return (
    <UserContext.Provider
      value={{
        activeUser,
        setActiveUser: handleUserChange,
        themeStyle,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
