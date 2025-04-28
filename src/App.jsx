import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";
import { GetTransactionsProvider } from "@c/Context/Context";

export const App = () => {
  return (
    <div>
      <Header />
      <GetTransactionsProvider>
        <Outlet />
      </GetTransactionsProvider>
    </div>
  );
};
