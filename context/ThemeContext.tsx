import React, { createContext, useContext, useState } from "react";

type UserProfile = {
  name: string;
  role: string;
  avatar: string;
  email: string;
  phone: string;
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<UserProfile>({
    name: "Ahmad Zaki",
    role: "Verified Owner",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    email: "zaki@university.id",
    phone: "+62 812-3456-7890",
  });

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const updateUser = (updated: Partial<UserProfile>) => setUser((prev) => ({ ...prev, ...updated }));

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, user, updateUser }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}