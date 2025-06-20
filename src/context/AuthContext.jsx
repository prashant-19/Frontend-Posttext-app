// ✅ AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      setUser({ token });
    } 
    setLoading(false);
  }, []);

  const login = (token) => {
    console.log("✅ Saving token to localStorage:", token);
    localStorage.setItem("token", token);
    setUser({token});
  };

  const logout = () => {
    console.log("🔓 Logging out: removing token");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
