import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
const authChecking = import.meta.env.VITE_API_AUTHCHECK;
const loginApi = import.meta.env.VITE_API_LOGIN;
const logoutApi = import.meta.env.VITE_API_LOGOUT;
const forgotPw = import.meta.env.VITE_API_FORGOTPW;

export const AuthContext = createContext();

export const GetAuthenticationProvider = ({ children }) => {
  const [isAuthStatus, setIsAuthStatus] = useState(null);

  const isUserAuthenticated = async () => {
    try {
      const response = await axios.get(authChecking);
      setIsAuthStatus({
        loggedIn: response.data.loggedIn,
        isVerified: response.data.isVerified,
        verificationToken: response.data.verificationToken,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loginUser = async (loginData) => {
    await axios.post(loginApi, loginData);
    const res = await axios.get(authChecking);
    setIsAuthStatus(res.data);
    return res.data.loggedIn;
  };

  const logoutUser = async () => {
    await axios.post(logoutApi);
    const res = await axios.get(authChecking);
    setIsAuthStatus(res.data);
    return res.data.loggedIn === false;
  };

  const forgotUserPw = async (resetData) => {
    await axios.post(forgotPw, resetData);
    const res = await axios.get(authChecking);
    setIsAuthStatus(res.data);
    return res.data.otpSent;
  };

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthStatus, loginUser, logoutUser, forgotUserPw }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// verwendung von useAuth() statt isAuthStatus, loginUser, logoutUser
// immer wieder über den Context in jeder file zu ziehen
export const useAuth = () => useContext(AuthContext);
