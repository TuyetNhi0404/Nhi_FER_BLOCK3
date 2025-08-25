import { createContext, useState, useEffect, useCallback } from "react";
import { API } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

  useEffect(() => {
    const saved = localStorage.getItem("auth_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await fetch(API.accounts);
    const accounts = await res.json();
    const found = accounts.find((a) => a.email === email && a.password === password);
    if (!found) throw new Error("Invalid email or password");
    setUser({ id: found.id, name: found.fullname || found.username, email: found.email });
    localStorage.setItem("auth_user", JSON.stringify({ id: found.id, name: found.fullname || found.username, email: found.email }));
    return found;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const register = useCallback(async (data) => {
   
    const res = await fetch(API.accounts);
    const accounts = await res.json();
    const id = (accounts.at(-1)?.id || 0) + 1;
    const newAcc = {
      id,
      username: data.username,
      email: data.email,
      password: data.password,
      fullname: data.fullname,
      secretQuestion: data.secretQuestion,
      answer: data.answer,
      avatar: data.avatar || null,
      wishlist: [],
      cart: []
    };
    await fetch(API.accounts, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAcc),
    });
    setUser({ id, name: data.fullname || data.username, email: data.email });
    localStorage.setItem("auth_user", JSON.stringify({ id, name: data.fullname || data.username, email: data.email }));
    return newAcc;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register, redirectAfterLogin, setRedirectAfterLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
