import { useContext } from "react";
import { AuthContext } from "@c/Context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthStatus } = useContext(AuthContext);

  if (isAuthStatus === null) {
    return <div>Loading...</div>;
  }

  if (isAuthStatus === true) {
    return children;
  }

  return <Navigate to="/login" />;

  return <></>;
};

export const GuestRoute = ({ children }) => {
  const { isAuthStatus } = useContext(AuthContext);

  if (isAuthStatus === null) {
    return <div>Loading...</div>;
  }

  if (isAuthStatus === true) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export const VerificationRoute = ({ children }) => {
  const { isAuthStatus } = useContext(AuthContext);

  if (isAuthStatus === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthStatus.isVerified && isAuthStatus.verificationToken) {
    return children;
  }

  return <Navigate to="/login" />;
};
