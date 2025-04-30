import { Navigate } from "react-router-dom";
import { useAuth } from "@c/Context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <div>Loading...</div>;
  }

  if (isAuthStatus.loggedIn) return children;

  return <Navigate to="/login" />;
};

export const GuestRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <div>Loading...</div>;
  }

  if (isAuthStatus.loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export const VerificationRoute = ({ children }) => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthStatus.isVerified && isAuthStatus.verificationToken) {
    return children;
  }

  return <Navigate to="/login" />;
};

// export const OtpRoute = ({ children }) => {
//   const { isAuthStatus } = useAuth();

//   if (isAuthStatus === null) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthStatus.isVerified && isAuthStatus.verificationToken) {
//     return children;
//   }

//   return <Navigate to="/login" />;
// };
