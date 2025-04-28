import { useContext } from "react";
import { AuthContext } from "@c/Context/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthStatus } = useContext(AuthContext);

  if (isAuthStatus) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }

  return <></>;
};
