import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};
