// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!accessToken);
  const [loading, setLoading] = useState(true);

  // Khi app khởi động → thử refresh token
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch("https://yourdomain.com/RefreshToken.php", {
          credentials: "include", // quan trọng để gửi cookie httpOnly
        });
        const data = await res.json();
        if (data.success) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem("accessToken", data.accessToken);
        } else {
          logout(); // nếu refresh fail → đăng xuất
        }
      } catch (err) {
        console.error("Refresh token failed:", err);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  // Đăng nhập
  const login = async (username, password) => {
    try {
      const res = await fetch("https://yourdomain.com/Login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // để nhận cookie refresh_token
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        setAccessToken(data.accessToken);
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", data.accessToken);
      }
      return data;
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Lỗi kết nối" };
    }
  };

  // Đăng xuất
  const logout = async () => {
    await fetch("https://yourdomain.com/Logout.php", {
      credentials: "include",
    });
    setUser(null);
    setAccessToken("");
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
