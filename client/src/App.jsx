import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";
import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
