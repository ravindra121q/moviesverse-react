import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.documentElement;
    if (theme === "dark") {
      el.classList.add("dark");
    } else {
      el.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    navigate("/");
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <AuthContext.Provider
      value={{ logout, loading, isAuthenticated, user, setUser, theme, setTheme }}
    >
      {children}
    </AuthContext.Provider>
  );
};
