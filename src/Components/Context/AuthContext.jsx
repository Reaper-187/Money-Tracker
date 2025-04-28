import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const authChecking = import.meta.env.VITE_API_AUTHCHECK;

export const AuthContext = createContext();

export const GetAuthenticationProvider = ({ children }) => {
  const [isAuthStatus, setIsAuthStatus] = useState(null);

  const isUserAuthenticated = async () => {
    try {
      const response = await axios.get(authChecking);
      setIsAuthStatus(response.data.loggedIn);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthStatus, isUserAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
