/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken, setToken, removeToken } from "../utils/auth";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = getToken();
    if (token) {
      try {
        const requestConfig = {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/authVerify`,
          requestConfig
        );
        console.log(response);
        if (response.status == 200) {
          setIsAuthenticated(true);
          setUser(response?.data?.data);
        }
      } catch (error) {
        logout();
        console.log(error);
      }
    }
  };

  const login = (token) => {
    setToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
