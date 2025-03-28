import React from "react";
import "./App.css";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import { Outlet } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { Dashboard } from "./Components/Dashboard/Dashboard";

export const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
};
