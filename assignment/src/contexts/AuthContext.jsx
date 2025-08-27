import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
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
    const { data: accounts } = await axios.get(API.accounts);
    const found = accounts.find(
      (a) => a.email === email && a.password === password
    );
    if (!found) throw new Error("Invalid email or password");

    const authUser = {
      id: found.id,
      name: found.fullname || found.username,
      email: found.email,
    };

    setUser(authUser);
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    return found;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth_user");
  }, []);

  const register = useCallback(async (data) => {
    const { data: accounts } = await axios.get(API.accounts);
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
      cart: [],
    };

    await axios.post(API.accounts, newAcc);

    const authUser = {
      id,
      name: data.fullname || data.username,
      email: data.email,
    };

    setUser(authUser);
    localStorage.setItem("auth_user", JSON.stringify(authUser));
    return newAcc;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        redirectAfterLogin,
        setRedirectAfterLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
