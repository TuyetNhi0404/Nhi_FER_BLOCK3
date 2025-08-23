import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ---- LOGIN ----
  const login = async (username, password) => {
    try {
      // Chỉ tìm theo username
      const res = await fetch(
        `http://localhost:3001/accounts?username=${username}`
      );
      const data = await res.json();

      // Nếu tồn tại user thì check mật khẩu
      if (data.length > 0 && data[0].password === password) {
        setUser(data[0]);
        setIsLoggedIn(true);
        return true;
      }

      // Sai mật khẩu hoặc không tìm thấy user
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // ---- REGISTER ----
  const register = async (newUser) => {
    try {
      // Kiểm tra trùng username
      const checkRes = await fetch(
        `http://localhost:3001/accounts?username=${newUser.username}`
      );
      const existingUser = await checkRes.json();

      if (existingUser.length > 0) {
        console.error("Username already exists!");
        return null; // username đã tồn tại
      }

      // Nếu chưa có thì tạo mới
      const res = await fetch("http://localhost:3001/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const savedUser = await res.json();
      setUser(savedUser);
      setIsLoggedIn(true);
      return savedUser;
    } catch (err) {
      console.error("Register error:", err);
      return null;
    }
  };

  // ---- LOGOUT ----
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
