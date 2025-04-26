import React from "react";
import "@fontsource/inter";
import "@fontsource/inter/600.css";

import { Outlet } from "react-router-dom";
import { Header } from "@c/Header/Header";
import { Toaster } from "sonner";
import { GetTransactionsProvider } from "@c/Context/Context";
import { Login } from "@/components/Auth/Login";
import { Register } from "@/components/Auth/Register";

export const App = () => {
  return (
    <div>
      {/* <Header /> */}
      {/* <Login /> */}
      <Register />

      {/* <GetTransactionsProvider>
        <Outlet />
      </GetTransactionsProvider>
      <Toaster /> */}
    </div>
  );
};
