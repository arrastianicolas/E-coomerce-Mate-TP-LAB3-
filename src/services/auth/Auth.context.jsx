import { useState, createContext } from "react";

export const AuthenticationContext = createContext();

const userValue = JSON.parse(localStorage.getItem("user"));

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const isAuthenticated = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogin = (email, userType) => {
    localStorage.setItem("user", JSON.stringify({ email, userType }));
    setUser({ email, userType });
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
