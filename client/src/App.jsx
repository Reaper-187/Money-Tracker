import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";
import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";
import { useAuth } from "@c/Context/AuthContext";
import { Spinner } from "@c/Spinner/Spinner";
export const App = () => {
  const { isAuthStatus } = useAuth();

  if (isAuthStatus === null) {
    return <Spinner />;
  }

  return (
    <>
      {isAuthStatus.loggedIn && <Header />}
      <Outlet />
    </>
  );
};
