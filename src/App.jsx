import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";
import { Toaster } from "sonner";
import { GetTransactionsProvider } from "@c/Context/Context";
import { Login } from '@c/Login/Login'

export const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <Login/>
      {/* <GetTransactionsProvider>
        <Outlet />
      </GetTransactionsProvider>
      <Toaster /> */}
    </div>
  );
};