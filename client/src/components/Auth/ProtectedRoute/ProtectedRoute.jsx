import { Navigate } from "react-router-dom";
import { useAuth } from "@c/Context/AuthContext";
import { Spinner } from "@c/Spinner/Spinner";

export const ProtectedRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <Spinner />;
  }

  if (isAuthStatus.loggedIn) return children;

  return <Navigate to="/login" />;
};

export const GuestRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <Spinner />;
  }

  if (isAuthStatus.loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export const VerificationRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <Spinner />;
  }

  if (!isAuthStatus.isVerified && isAuthStatus.verificationToken) {
    return children;
  }

  return <Navigate to="/login" />;
};

export const OtpRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <Spinner />;
  }

  if (isAuthStatus.otpSent !== null) {
    return children;
  }
  return <Navigate to="/login" />;
};
