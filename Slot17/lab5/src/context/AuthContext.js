import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ---- LOGIN ----
  const login = async (username, password) => {
    try {
      const res = await fetch(
        `http://localhost:3001/accounts?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        setUser(data[0]);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // ---- REGISTER ----
  const register = async (newUser) => {
    try {
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
